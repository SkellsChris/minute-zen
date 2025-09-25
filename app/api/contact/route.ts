import nodemailer from 'nodemailer'
import isEmail from 'validator/lib/isEmail'
import { NextResponse } from 'next/server'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

function getClientIp(request: Request) {
  const forwarded = request.headers.get('x-forwarded-for')
  if (forwarded) {
    const [ip] = forwarded.split(',').map((part) => part.trim()).filter(Boolean)
    if (ip) {
      return ip
    }
  }
  return request.headers.get('cf-connecting-ip') || 'unknown'
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

function normalizeLineBreaks(value: string) {
  return value.replace(/\r\n/g, '\n').replace(/\r/g, '\n')
}

function sanitizeHeader(value: string) {
  return value.replace(/[\r\n]+/g, ' ').trim()
}

export async function POST(request: Request) {
  const ip = getClientIp(request)

  let payload: unknown
  try {
    payload = await request.json()
  } catch (error) {
    console.log(`[contact] ip=${ip} status=400 subject="invalid-json"`)
    return NextResponse.json(
      { ok: false, error: 'Invalid JSON payload.' },
      { status: 400 }
    )
  }

  const { name, email, subject, message } = (payload || {}) as Record<string, unknown>

  const trimmedName = typeof name === 'string' ? name.trim() : ''
  const trimmedEmail = typeof email === 'string' ? email.trim() : ''
  const trimmedSubject = typeof subject === 'string' ? subject.trim() : ''
  const normalizedMessage =
    typeof message === 'string' ? normalizeLineBreaks(message.trim()) : ''

  const safeName = sanitizeHeader(trimmedName)
  const safeSubject = trimmedSubject ? sanitizeHeader(trimmedSubject) : ''
  const safeEmail = trimmedEmail.replace(/[\r\n]+/g, '')

  const errors: Record<string, string> = {}

  if (trimmedName.length < 2 || trimmedName.length > 80) {
    errors.name = 'Le nom doit contenir entre 2 et 80 caractères.'
  }

  if (!isEmail(trimmedEmail)) {
    errors.email = "L'adresse email est invalide."
  }

  if (!trimmedSubject) {
    errors.subject = 'Le sujet est requis.'
  } else if (trimmedSubject.length > 120) {
    errors.subject = 'Le sujet doit contenir au maximum 120 caractères.'
  }

  if (normalizedMessage.length < 10 || normalizedMessage.length > 5000) {
    errors.message = 'Le message doit contenir entre 10 et 5000 caractères.'
  }

  if (Object.keys(errors).length > 0) {
    console.log(
      `[contact] ip=${ip} status=400 subject="${safeSubject || 'invalid'}"`
    )
    return NextResponse.json({ ok: false, error: errors }, { status: 400 })
  }

  const smtpUser = process.env.SMTP_USER
  const smtpPass = process.env.SMTP_PASS
  const smtpHost = process.env.SMTP_HOST || 'ssl0.ovh.net'
  const smtpSecure = process.env.SMTP_SECURE === 'true'
  const smtpPort = process.env.SMTP_PORT
    ? Number.parseInt(process.env.SMTP_PORT, 10)
    : smtpSecure
    ? 465
    : 587

  const contactFrom = process.env.CONTACT_FROM || smtpUser
  const contactTo = process.env.CONTACT_TO || smtpUser
  const contactBcc = process.env.CONTACT_BCC

  if (!smtpUser || !smtpPass || !contactFrom || !contactTo) {
    console.log(
      `[contact] ip=${ip} status=500 subject="${safeSubject}"`
    )
    return NextResponse.json(
      {
        ok: false,
        error: 'Email service is not configured correctly.',
      },
      { status: 500 }
    )
  }

  const transporter = nodemailer.createTransport({
    host: smtpHost,
    port: smtpPort,
    secure: smtpSecure,
    requireTLS: smtpSecure ? undefined : true,
    auth: {
      user: smtpUser,
      pass: smtpPass,
    },
  })

  try {
    await transporter.verify()
  } catch (error) {
    console.log(
      `[contact] ip=${ip} status=503 subject="${safeSubject}"`
    )
    return NextResponse.json(
      { ok: false, error: 'Email service unavailable.' },
      { status: 503 }
    )
  }

  const recipients = contactTo
    .split(',')
    .map((entry) => entry.trim())
    .filter(Boolean)

  const bccRecipients = contactBcc
    ? contactBcc
        .split(',')
        .map((entry) => entry.trim())
        .filter(Boolean)
    : undefined

  const finalBcc = bccRecipients && bccRecipients.length > 0 ? bccRecipients : undefined

  if (recipients.length === 0) {
    console.log(`[contact] ip=${ip} status=500 subject="${safeSubject}"`)
    return NextResponse.json(
      { ok: false, error: 'No recipients configured for contact emails.' },
      { status: 500 }
    )
  }

  const textBody = `Nom: ${trimmedName}\nEmail: ${trimmedEmail}\n\n${normalizedMessage}`
  const htmlBody = `<!doctype html><html><body style="font-family:system-ui,sans-serif;color:#0f172a;">
<p><strong>Nom :</strong> ${escapeHtml(trimmedName)}</p>
<p><strong>Email :</strong> ${escapeHtml(trimmedEmail)}</p>
<p><strong>Message :</strong><br/>${escapeHtml(normalizedMessage).replace(/\n/g, '<br/>')}</p>
</body></html>`

  const subjectLine = `[MinuteZen • Contact] ${safeSubject} — from ${safeName}`

  try {
    const info = await transporter.sendMail({
      from: contactFrom,
      to: recipients,
      bcc: finalBcc,
      replyTo: `${safeName} <${safeEmail}>`,
      subject: subjectLine,
      text: textBody,
      html: htmlBody,
    })

    console.log(`[contact] ip=${ip} status=200 subject="${safeSubject}"`)
    return NextResponse.json({ ok: true, messageId: info.messageId })
  } catch (error) {
    console.log(`[contact] ip=${ip} status=500 subject="${safeSubject}"`)
    return NextResponse.json(
      { ok: false, error: 'Failed to send the email.' },
      { status: 500 }
    )
  }
}
