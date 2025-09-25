// app/api/sender/subscribe/route.ts
import { NextResponse } from 'next/server';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

function isEmail(s: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s);
}

export async function POST(request: Request) {
  // 1) Parse + normalise
  let body: any;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: 'Invalid JSON' }, { status: 400 });
  }

  const firstName = String(
    body?.firstName ?? body?.firstname ?? body?.prenom ?? body?.name ?? ''
  ).trim();
  const email = String(body?.email ?? '').trim();

  if (!firstName || firstName.length > 100) {
    return NextResponse.json({ ok: false, error: 'Invalid first name' }, { status: 400 });
  }
  if (!isEmail(email)) {
    return NextResponse.json({ ok: false, error: 'Invalid email' }, { status: 400 });
  }

  // 2) Config (supporte 2 modes)
  const directEndpoint = (process.env.SENDER_API || '').trim();           // ex: webhook perso
  const apiBase = (process.env.SENDER_API_URL || 'https://api.sender.net/v2').trim();
  const apiToken = (process.env.SENDER_API_TOKEN || '').trim();

  // Ciblage : liste OU groupe OU tag
  const listId  = (process.env.SENDER_LIST_ID  || '').trim();             // ex: "123456"
  const groupId = (process.env.SENDER_GROUP_ID || '').trim();             // ex: "bDE8Rx"
  const tag     = (process.env.SENDER_TAG      || 'pack-audio').trim();   // fallback pratique

  // Payload compatible (plusieurs APIs acceptent "first_name" ou "name")
  const payload: any = {
    email,
    first_name: firstName,
    name: firstName,
    status: 'subscribed', // si double opt-in sur la liste, passer à 'pending'
    custom_fields: { source: 'pack-audio' },
  };

  // Priorité: LISTE > GROUPE > TAG
  if (listId) payload.lists = [listId];
  else if (groupId) payload.groups = [groupId];
  else payload.tags = [tag];

  // 3) Construis les endpoints à essayer (tolérant selon version API)
  const endpoints: string[] = [];
  if (directEndpoint) {
    endpoints.push(directEndpoint);
  } else {
    const base = apiBase.replace(/\/$/, '');
    endpoints.push(`${base}/contacts`);     // le plus courant
    endpoints.push(`${base}/subscribers`);  // alternative selon versions
  }

  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  };
  if (!directEndpoint) {
    if (!apiToken) {
      return NextResponse.json(
        { ok: false, error: 'Missing SENDER_API_TOKEN for Sender API' },
        { status: 500 }
      );
    }
    headers.Authorization = `Bearer ${apiToken}`;
  } else {
    // si tu veux sécuriser ton endpoint direct
    if (process.env.SENDER_API_TOKEN) {
      headers.Authorization = `Bearer ${process.env.SENDER_API_TOKEN}`;
    }
  }

  // 4) On tente en séquence, on remonte les erreurs détaillées
  const attempts: any[] = [];
  for (const url of endpoints) {
    try {
      const resp = await fetch(url, {
        method: 'POST',
        headers,
        body: JSON.stringify(payload),
      });

      const data = await resp.json().catch(() => null);

      if (resp.ok) {
        return NextResponse.json({ ok: true, data }, { status: 200 });
      } else {
        attempts.push({ url, status: resp.status, data });
      }
    } catch (e: any) {
      attempts.push({ url, networkError: e?.message || String(e) });
    }
  }

  // Rien n'a marché
  return NextResponse.json(
    {
      ok: false,
      error: 'Sender API error',
      attempts, // ← tu verras ici exactement ce que répond l’API dans l’onglet Network
    },
    { status: 500 }
  );
}
