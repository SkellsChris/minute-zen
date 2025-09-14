import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  const { name, email, subject, message } = await request.json()

  // In development or test environments the RESEND_API_KEY might be
  // missing. Instead of throwing an error and preventing the form from
  // working, simply log the message and return a success response.
  if (!process.env.RESEND_API_KEY) {
    console.warn('RESEND_API_KEY is not set. Skipping email send.')
    return NextResponse.json({ success: true })
  }

  try {
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: 'Contact Form <onboarding@resend.dev>',
        to: ['contact@minutezen.fr'],
        subject: subject || 'Message MinuteZen',
        reply_to: email,
        text: `Nom: ${name}\nEmail: ${email}\n\n${message}`,
      }),
    })

    if (!res.ok) {
      return NextResponse.json({ error: 'Failed to send email' }, { status: 500 })
    }
  } catch (err) {
    console.error('Error while sending contact email', err)
    return NextResponse.json({ error: 'Failed to send email' }, { status: 500 })
  }

  return NextResponse.json({ success: true })
}
