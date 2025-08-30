// app/api/dato-check/route.ts
export const runtime = 'nodejs';

export async function GET() {
  const endpoint = process.env.DATOCMS_GRAPHQL_ENDPOINT || 'https://graphql.datocms.com/';
  const token = process.env.DATOCMS_API_TOKEN ?? '';
  const headers: Record<string,string> = {
    'Content-Type': 'application/json',
    Accept: 'application/json',
    Authorization: `Bearer ${token}`,
  };
  const res = await fetch(endpoint, {
    method: 'POST',
    headers,
    body: JSON.stringify({ query: '{ _site { locales } }' }),
    cache: 'no-store',
  });
  const text = await res.text();
  return new Response(text, { status: res.status, headers: { 'content-type': 'application/json' } });
}
