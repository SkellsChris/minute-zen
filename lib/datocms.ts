// lib/datocms.ts
import 'server-only';
import type { Article } from './types';
import { ALL_ARTICLES_QUERY } from './queries';

const DEFAULT_ENDPOINT = 'https://graphql.datocms.com/';

export async function datoRequest<T>(
  query: string,
  variables?: Record<string, unknown>,
  // revalidate n’a aucun effet sur un POST ; on le garde pour compat futur mais on ne l’utilise pas ici
  { revalidate = 60 }: { revalidate?: number } = {}
): Promise<T> {
  const endpoint = process.env.DATOCMS_GRAPHQL_ENDPOINT || DEFAULT_ENDPOINT;
  const token = process.env.DATOCMS_API_TOKEN;

  if (!token) {
    throw new Error('Missing DATOCMS_API_TOKEN at runtime');
  }

  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    Accept: 'application/json',
    Authorization: `Bearer ${token}`,
    'X-Exclude-Invalid': 'true',
  };
  const datoEnv = process.env.DATOCMS_ENVIRONMENT?.trim();
  if (datoEnv) headers['X-Environment'] = datoEnv;

  // Petit log temporaire (visible dans Function Logs)
  console.log('[Dato] endpoint=', endpoint, ' tokenPrefix=', token.slice(0, 6), ' env=', datoEnv || 'default');

  const res = await fetch(endpoint, {
    method: 'POST',
    headers,
    body: JSON.stringify({ query, variables }),
    cache: 'no-store', // DEBUG: évite toute mise en cache
  });

  const text = await res.text();

  if (!res.ok) {
    // Affiche clairement la vraie réponse du serveur (HTML/JSON)
    throw new Error(`Dato ${res.status} ${res.statusText}: ${text.slice(0, 400)}`);
  }

  let json: any;
  try {
    json = JSON.parse(text);
  } catch {
    throw new Error(`Dato non-JSON (${res.status}): ${text.slice(0, 400)}`);
  }

  if (json.errors) {
    throw new Error(JSON.stringify(json.errors));
  }
  return json.data as T;
}

export async function getAllArticles(
  locale: string = process.env.DEFAULT_LOCALE || 'fr'
): Promise<Article[]> {
  const { allArticles } = await datoRequest<{ allArticles: Article[] }>(ALL_ARTICLES_QUERY, { locale });
  return allArticles;
}
