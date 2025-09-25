import net from 'node:net'
import tls from 'node:tls'
import { NextResponse } from 'next/server'

export const runtime = 'nodejs'

type SMTPOptions = {
  host: string
  port: number
  secure: boolean
  username?: string
  password?: string
}

type PendingResponse = {
  expected: number[]
  resolve: (response: SMTPResponse) => void
  reject: (error: Error) => void
}

type SMTPResponse = {
  code: number
  message: string
}

class SMTPClient {
  private socket: net.Socket | tls.TLSSocket
  private buffer = ''
  private queue: PendingResponse[] = []
  private responses: SMTPResponse[] = []
  private current: { code: number; lines: string[] } | null = null
  private closed = false

  constructor(socket: net.Socket | tls.TLSSocket) {
    this.socket = socket
    this.socket.setEncoding('utf8')
    this.socket.on('data', (chunk) => {
      this.buffer += chunk
      this.processBuffer()
    })
    this.socket.on('error', (err) => {
      while (this.queue.length) {
        this.queue.shift()?.reject(err)
      }
    })
    this.socket.on('close', () => {
      this.closed = true
      while (this.queue.length) {
        this.queue
          .shift()
          ?.reject(new Error('SMTP connection closed unexpectedly'))
      }
    })
  }

  async wait(expected: number[]) {
    return new Promise<SMTPResponse>((resolve, reject) => {
      this.queue.push({ expected, resolve, reject })
      this.drain()
    })
  }

  async command(command: string, expected: number[]) {
    if (this.closed) {
      throw new Error('SMTP connection is closed')
    }
    return new Promise<SMTPResponse>((resolve, reject) => {
      this.queue.push({ expected, resolve, reject })
      this.socket.write(`${command}\r\n`)
      this.drain()
    })
  }

  async data(payload: string, expected: number[]) {
    if (this.closed) {
      throw new Error('SMTP connection is closed')
    }
    return new Promise<SMTPResponse>((resolve, reject) => {
      this.queue.push({ expected, resolve, reject })
      this.socket.write(payload)
      this.drain()
    })
  }

  private processBuffer() {
    while (true) {
      const delimiterIndex = this.buffer.indexOf('\r\n')
      if (delimiterIndex === -1) {
        return
      }
      const line = this.buffer.slice(0, delimiterIndex)
      this.buffer = this.buffer.slice(delimiterIndex + 2)
      if (!line) {
        continue
      }
      const code = Number.parseInt(line.slice(0, 3), 10)
      const continuation = line[3] === '-'
      const text = line.length > 4 ? line.slice(4) : ''
      if (!this.current) {
        this.current = { code, lines: [text] }
      } else {
        this.current.lines.push(text)
      }
      if (!continuation) {
        const response: SMTPResponse = {
          code: this.current.code,
          message: this.current.lines.join('\n'),
        }
        this.current = null
        this.responses.push(response)
        this.drain()
      }
    }
  }

  private drain() {
    while (this.queue.length && this.responses.length) {
      const pending = this.queue.shift()!
      const response = this.responses.shift()!
      if (!pending.expected.includes(response.code)) {
        pending.reject(
          new Error(`SMTP command failed with ${response.code}: ${response.message}`)
        )
      } else {
        pending.resolve(response)
      }
    }
  }

  close() {
    if (!this.closed) {
      this.socket.end()
    }
  }
}

async function connectSMTP(options: SMTPOptions) {
  const socket = options.secure
    ? tls.connect({
        host: options.host,
        port: options.port,
        servername: options.host,
      })
    : net.createConnection({ host: options.host, port: options.port })

  await new Promise<void>((resolve, reject) => {
    const connectEvent = options.secure ? 'secureConnect' : 'connect'
    socket.once(connectEvent, () => resolve())
    socket.once('error', (err) => reject(err))
  })

  return new SMTPClient(socket)
}

async function sendSMTPMail(
  options: SMTPOptions,
  message: {
    envelopeFrom: string
    headerFrom: string
    to: string[]
    replyTo?: string
    subject: string
    text: string
  }
) {
  const client = await connectSMTP(options)

  try {
    await client.wait([220])
    await client.command('EHLO minutezen.fr', [250])

    if (options.username && options.password) {
      await client.command('AUTH LOGIN', [334])
      await client.command(
        Buffer.from(options.username, 'utf8').toString('base64'),
        [334]
      )
      await client.command(
        Buffer.from(options.password, 'utf8').toString('base64'),
        [235]
      )
    }

    await client.command(`MAIL FROM:<${message.envelopeFrom}>`, [250])
    for (const recipient of message.to) {
      await client.command(`RCPT TO:<${recipient}>`, [250, 251])
    }
    await client.command('DATA', [354])

    const headers = [
      `From: ${message.headerFrom}`,
      `To: ${message.to.join(', ')}`,
      `Subject: ${message.subject}`,
      'MIME-Version: 1.0',
      'Content-Type: text/plain; charset=utf-8',
    ]
    if (message.replyTo) {
      headers.push(`Reply-To: ${message.replyTo}`)
    }

    const body = `${headers.join('\r\n')}\r\n\r\n${message.text}`
      .replace(/\r?\n/g, '\r\n')
      .replace(/\n\./g, '\n..')

    await client.data(`${body}\r\n.\r\n`, [250])
    await client.command('QUIT', [221, 250])
  } finally {
    client.close()
  }
}

export async function POST(request: Request) {
  const { name, email, subject, message } = await request.json()

  const host = process.env.SMTP_HOST
  const port = process.env.SMTP_PORT ? Number.parseInt(process.env.SMTP_PORT, 10) : 465
  const username = process.env.SMTP_USERNAME
  const password = process.env.SMTP_PASSWORD
  const fromEmail = process.env.SMTP_FROM || username
  const fromName = process.env.SMTP_FROM_NAME
  const to = process.env.CONTACT_TO || 'contact@minutezen.fr'
  const secure = process.env.SMTP_SECURE !== 'false'

  if (!host || !fromEmail) {
    console.warn('SMTP credentials are not fully configured. Skipping email send.')
    return NextResponse.json({ success: true })
  }

  try {
    await sendSMTPMail(
      { host, port, secure, username, password },
      {
        envelopeFrom: fromEmail,
        headerFrom: fromName ? `${fromName} <${fromEmail}>` : fromEmail,
        to: to.split(',').map((recipient) => recipient.trim()).filter(Boolean),
        replyTo: email,
        subject: subject || 'Message MinuteZen',
        text: `Nom: ${name}\nEmail: ${email}\n\n${message}`,
      }
    )
  } catch (err) {
    console.error('Error while sending contact email', err)
    return NextResponse.json({ error: 'Failed to send email' }, { status: 500 })
  }

  return NextResponse.json({ success: true })
}
