export const dynamicParams = true;
export const dynamic = 'force-dynamic';

import { datoRequest } from '@/lib/datocms';
import { ARTICLE_BY_SLUG } from '@/lib/queries';

const LOCALE = process.env.DEFAULT_LOCALE ?? 'fr';

export default async function Page({ params }: { params: { slug: string } }) {
  let data: any = null;
  let err: any = null;

  try {
    data = await datoRequest(ARTICLE_BY_SLUG, { slug: params.slug, locale: LOCALE });
  } catch (e: any) {
    err = String(e?.message ?? e);
  }

  const article = data?.article ?? null;

  // 🔎 Affiche tout en clair pour comprendre ce qui revient
  if (!article || err) {
    return (
      <pre style={{ padding: 24, whiteSpace: 'pre-wrap' }}>
        {'DEBUG /blog/[slug]\n'}
        {'slug: '}{params.slug}{'\n'}
        {'locale: '}{LOCALE}{'\n\n'}
        {'error: '}{err ?? 'none'}{'\n\n'}
        {`raw data: ${JSON.stringify(data, null, 2)}`}
      </pre>
    );
  }

  return (
    <main className="prose mx-auto">
      <h1>{article.title}</h1>
    </main>
  );
}
