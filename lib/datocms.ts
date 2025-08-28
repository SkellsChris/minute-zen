// lib/datocms.ts
import 'server-only';

const TOKEN = process.env.DATOCMS_API_TOKEN; // même nom que sur Vercel
if (!TOKEN) {
  throw new Error('❌ DATOCMS_API_TOKEN manquant (Vercel > Settings > Environment Variables).');
}

// Passe en preview si tu veux voir les brouillons (ou mets DATOCMS_INCLUDE_DRAFTS=true)
const ENDPOINT =
  process.env.DATOCMS_INCLUDE_DRAFTS === 'true'
    ? 'https://graphql.datocms.com/preview'
    : 'https://graphql.datocms.com/';

type GraphQLResponse<T> = { data?: T; errors?: unknown };

export async function datoRequest<T = any>(
  query: string,
  variables?: Record<string, unknown>
): Promise<T> {
  const res = await fetch(ENDPOINT, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${TOKEN}`,
      'X-Exclude-Invalid': 'true',
      ...(process.env.DATOCMS_INCLUDE_DRAFTS === 'true' ? { 'X-Include-Drafts': 'true' } : {}),
    },
    // en debug, évite le cache build-time
    cache: 'no-store',
    // si tu utilises l'Edge runtime, commente le suivant
    // next: { revalidate: 60 },
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`❌ DatoCMS ${res.status} ${res.statusText}: ${text}`);
  }

  const json = (await res.json()) as GraphQLResponse<T>;
  if (json.errors) {
    throw new Error(`❌ GraphQL errors: ${JSON.stringify(json.errors)}`);
  }
  if (!json.data) {
    throw new Error('❌ Réponse vide de DatoCMS.');
  }
  return json.data;
}
