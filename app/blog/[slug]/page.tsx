import { notFound } from 'next/navigation';
import { datoRequest } from '@/lib/datocms';
import { ALL_SLUGS, ARTICLE_BY_SLUG } from '@/lib/queries';

export const runtime = 'nodejs';
export const revalidate = 60;
// (DIAGNOSTIC possible) : dé-commente 2 lignes suivantes le temps d’un test
// export const dynamic = 'force-dynamic';
// export const revalidate = 0;

const LOCALE = process.env.DEFAULT_LOCALE ?? 'fr';

type Slug = { slug: string };

export async function generateStaticParams() {
  try {
    const data = await datoRequest<{ allArticles: Slug[] }>(ALL_SLUGS, { locale: LOCALE });
    return data.allArticles.map(a => ({ slug: a.slug }));
  } catch (e) {
    console.error('generateStaticParams error', e);
    return [];
  }
}

export default async function Page({ params }: { params: { slug: string } }) {
  // Ne pas transformer une erreur en 404 : on laisse remonter pour logs clairs
  const { article } = await datoRequest<{ article: any }>(
    ARTICLE_BY_SLUG,
    { slug: params.slug, locale: LOCALE }
  );

  if (!article) {
    console.error('Article introuvable', { slug: params.slug, localeTried: LOCALE });
    notFound();
  }

  const rimg = article.image?.responsiveImage; // correspond à la query
  return (
    <main className="prose mx-auto">
      <h1>{article.title}</h1>
      {rimg?.src && (
        <img src={rimg.src} alt={rimg.alt ?? ''} width={rimg.width} height={rimg.height} />
      )}
    </main>
  );
}
