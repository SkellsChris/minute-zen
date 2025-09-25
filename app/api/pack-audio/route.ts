import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  const { name, email } = await request.json()

  if (!name || !email) {
    return NextResponse.json({ error: 'Missing fields' }, { status: 400 })
  }

  const senderEndpoint = process.env.SENDER_API

  if (!senderEndpoint) {
    console.warn('Sender configuration missing. Skipping subscription call.')
    return NextResponse.json({ success: true })
  }

  try {
    const response = await fetch(senderEndpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        firstname: name,
        automation: 'packaudio',
      }),
    })

    if (!response.ok) {
      const errorText = await response.text()
      console.error('Failed to sync contact with Sender:', errorText)
      return NextResponse.json({ error: 'Failed to save contact' }, { status: 500 })
    }
  } catch (err) {
    console.error('Unable to call Sender API', err)
    return NextResponse.json({ error: 'Failed to save contact' }, { status: 500 })
  }

  return NextResponse.json({ success: true })
}
