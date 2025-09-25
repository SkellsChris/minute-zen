// app/api/sender/subscribe/route.ts (ou app/api/pack-audio/route.ts selon ton arbo)
import { NextResponse } from 'next/server';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

function isEmail(s: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s);
}

export async function POST(request: Request) {
  // -------- Parse body
  let body: any;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: 'Invalid JSON' }, { status: 400 });
  }

  // -------- Normalise champs (name / firstName / prenom)
  const firstName = String(
    body?.firstName ?? body?.firstname ?? body?.prenom ?? body?.name ?? ''
  ).trim();
  const email = String(body?.email ?? '').trim();

  // -------- Validation
  if (!firstName || firstName.length > 100) {
    return NextResponse.json({ ok: false, error: 'Invalid first name' }, { status: 400 });
  }
  if (!isEmail(email)) {
    return NextResponse.json({ ok: false, error: 'Invalid email' }, { status: 400 });
  }

  // -------- Config - deux modes
  const directEndpoint = (process.env.SENDER_API || '').trim();          // Mode B
  const apiBase = (process.env.SENDER_API_URL || '').trim();             // Mode A
  const apiToken = (process.env.SENDER_API_TOKEN || '').trim();          // Mode A ou B (si besoin)
  const listId  = (process.env.SENDER_LIST_ID || '').trim();             // Optionnel mais conseillé

  // Détermine l’URL finale et les headers
  const url =
    directEndpoint ||
    (apiBase ? `${apiBase.replace(/\/$/, '')}/contacts` : '');

  if (!url) {
    return NextResponse.json(
      { ok: false, error: 'Sender API is not configured (SENDER_API or SENDER_API_URL missing)' },
      { status: 500 }
    );
  }

  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  };
  if (apiToken) headers.Authorization = `Bearer ${apiToken}`;

  // Payload générique Sender (ajuste si ton compte requiert un schéma différent)
  const payload: any = {
    email,
    first_name: firstName,
    status: 'subscribed',                 // si double opt-in actif sur la liste, tu peux mettre 'pending'
    custom_fields: { source: 'pack-audio' }
  };
  if (listId) payload.lists = [listId];

  try {
    const resp = await fetch(url, {
      method: 'POST',
      headers,
      body: JSON.stringify(payload),
    });

    // Essaye de lire la réponse même en cas d’erreur pour debug
    const data = await resp.json().catch(() => null);

    if (!resp.ok) {
      return NextResponse.json(
        { ok: false, code: resp.status, error: 'Sender API error', data },
        { status: 500 }
      );
    }

    return NextResponse.json({ ok: true, data }, { status: 200 });
  } catch (err: any) {
    return NextResponse.json(
      { ok: false, error: err?.message || 'Network error' },
      { status: 500 }
    );
  }
}
