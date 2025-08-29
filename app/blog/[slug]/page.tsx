import { notFound } from 'next/navigation';
import { datoRequest } from '@/lib/datocms';
import { ALL_SLUGS, ARTICLE_BY_SLUG } from '@/lib/queries';

export const runtime = 'nodejs';
export const revalidate = 60;
// Laisse dynamicParams à true (par défaut). Ne PAS mettre dynamicParams = false.

const LOCALE = process.env.DEFAULT_LOCALE ?? 'fr';

type Slug = { slug: string };

export async function generateStaticParams() {
  try {
    const data = await datoRequest<{ allArticles: Slug[] }>(ALL_SLUGS, { locale: LOCALE });
    return data.allArticles.map(a => ({ slug: a.slug }));
  } catch (e) {
    console.error('generateStaticParams error', e);
    // On retourne un tableau vide, Next rendra quand même dynamiquement si le path n'est pas pré-généré
    return [];
  }
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  try {
    const { article } = await datoRequest<{ article: any }>(
      ARTICLE_BY_SLUG,
      { slug: params.slug, locale: LOCALE }
    );
    if (!article) return {};
    return {
      title: article.seo?.find((t: any) => t.tag === 'title')?.content ?? article.title,
      description: article.seo?.find(
        (t: any) => t.tag === 'meta' && t.attributes?.name === 'description'
      )?.attributes?.content,
      metadataBase: new URL(process.env.SITE_URL ?? 'https://example.com'),
    };
  } catch (e) {
    console.error('generateMetadata error', e);
    return {};
  }
}

export default async function Page({ params }: { params: { slug: string } }) {
  let article: any;

  try {
    ({ article } = await datoRequest<{ article: any }>(
      ARTICLE_BY_SLUG,
      { slug: params.slug, locale: LOCALE }
    ));
  } catch (e) {
    // NE PAS transformer l'erreur en 404: on log et on relance pour voir l'erreur réelle en logs
    console.error('article fetch error', e);
    throw e;
  }

  if (!article) {
    console.error('Article introuvable pour slug:', params.slug, 'locale:', LOCALE);
    notFound();
  }

  return (
    <main className="prose mx-auto">
      <h1>{article.title}</h1>
      {article.image?.url && <img src={article.image.url} alt={article.image.alt ?? ''} />}
      {/* StructuredText ici si besoin */}
    </main>
  );
}
