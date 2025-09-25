import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  const { name, email } = await request.json()

  if (!name || !email) {
    return NextResponse.json({ error: 'Missing fields' }, { status: 400 })
  }

  const apiKey = process.env.SENDER_API_KEY
  const listId = process.env.SENDER_LIST_ID

  if (!apiKey || !listId) {
    console.warn('Sender configuration missing. Skipping subscription call.')
    return NextResponse.json({ success: true })
  }

  try {
    const response = await fetch('https://api.sender.net/v2/contacts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        email,
        firstname: name,
        lists: [listId],
        triggered_from: 'minutezen-pack-audio',
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
