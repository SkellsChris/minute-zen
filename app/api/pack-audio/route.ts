// app/api/sender/subscribe/route.ts
import { NextResponse } from 'next/server';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

function isEmail(s: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s);
}

export async function POST(request: Request) {
  let body: any;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: 'Invalid JSON' }, { status: 400 });
  }

  const firstName = String(body?.firstName ?? body?.firstname ?? body?.prenom ?? body?.name ?? '').trim();
  const email = String(body?.email ?? '').trim();

  if (!firstName || firstName.length > 100) {
    return NextResponse.json({ ok: false, error: 'Invalid first name' }, { status: 400 });
  }
  if (!isEmail(email)) {
    return NextResponse.json({ ok: false, error: 'Invalid email' }, { status: 400 });
  }

  const apiBase  = (process.env.SENDER_API_URL || 'https://api.sender.net/v2').replace(/\/$/, '');
  const apiToken = (process.env.SENDER_API_TOKEN || '').trim();
  if (!apiToken) {
    return NextResponse.json({ ok: false, error: 'Missing SENDER_API_TOKEN' }, { status: 500 });
  }

  // Groupe forcé (env > fallback)
  const groupId = (process.env.SENDER_GROUP_ID || 'bDE8Rx').trim();

  // ✅ IMPORTANT: Sender attend "firstname" (pas first_name)
  const payload: any = {
    email,
    firstname: firstName,          // <-- le bon champ builtin
    status: 'subscribed',          // 'pending' si double opt-in
    groups: [groupId],
    // optionnel si tu veux garder une trace:
    custom_fields: { source: 'pack-audio' },
  };

  const headers = {
    'Content-Type': 'application/json',
    Accept: 'application/json',
    Authorization: `Bearer ${apiToken}`,
  };

  // Essai /contacts puis /subscribers selon version d'API
  const urls = [`${apiBase}/contacts`, `${apiBase}/subscribers`];
  const attempts: any[] = [];

  for (const url of urls) {
    try {
      const resp = await fetch(url, { method: 'POST', headers, body: JSON.stringify(payload) });
      const data = await resp.json().catch(() => null);
      if (resp.ok) return NextResponse.json({ ok: true, data }, { status: 200 });
      attempts.push({ url, status: resp.status, data });
    } catch (e: any) {
      attempts.push({ url, networkError: e?.message || String(e) });
    }
  }

  return NextResponse.json({ ok: false, error: 'Sender API error', attempts }, { status: 500 });
}
