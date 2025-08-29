// lib/datocms.ts
import 'server-only';

const endpoint = process.env.DATOCMS_GRAPHQL_ENDPOINT ?? 'https://graphql.datocms.com/';
const token = process.env.DATOCMS_API_TOKEN;

export async function datoRequest<T>(
  query: string,
  variables?: Record<string, unknown>,
  { revalidate = 60 }: { revalidate?: number } = {}
): Promise<T> {
  if (!token) {
    throw new Error('Missing DATOCMS_API_TOKEN (set it in your env and redeploy).');
  }

  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
    'X-Exclude-Invalid': 'true', // évite les records invalides
  };
  if (process.env.DATOCMS_ENVIRONMENT) {
    headers['X-Environment'] = process.env.DATOCMS_ENVIRONMENT;
  }

  const res = await fetch(endpoint, {
    method: 'POST',
    headers,
    body: JSON.stringify({ query, variables }),
    next: { revalidate },
  });

  const text = await res.text();

  let json: any;
  try {
    json = JSON.parse(text);
  } catch {
    console.error('DatoCMS non-JSON response:', { status: res.status, text });
    throw new Error(`DatoCMS response not JSON (status ${res.status}).`);
  }

  if (!res.ok || json.errors) {
    console.error('DatoCMS GraphQL error:', {
      status: res.status,
      errors: json.errors,
      variables,
      body: text,
    });
    const first = json?.errors?.[0]?.message;
    throw new Error(first ?? `DatoCMS fetch failed: ${res.status}`);
  }

  return json.data as T;
}
