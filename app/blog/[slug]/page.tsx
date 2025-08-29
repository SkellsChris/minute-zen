import { notFound } from 'next/navigation';
import { datoRequest } from '@/lib/datocms';
import { ALL_SLUGS, ARTICLE_BY_SLUG } from '@/lib/queries';

export const revalidate = 60;
export const runtime = 'nodejs'; // évite les soucis d’ENV en edge

type Slug = { slug: string };

export async function generateStaticParams() {
  const data = await datoRequest<{ allArticles: Slug[] }>(ALL_SLUGS);
  return data.allArticles.map(a => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  try {
    const { article } = await datoRequest<{ article: any }>(ARTICLE_BY_SLUG, { slug: params.slug });
    if (!article) return {};
    return {
      title: article.seo?.find((t: any) => t.tag === 'title')?.content ?? article.title,
      description: article.seo?.find((t: any) => t.tag === 'meta' && t.attributes?.name === 'description')?.attributes?.content,
      metadataBase: new URL(process.env.SITE_URL ?? 'https://example.com'),
    };
  } catch (e) {
    console.error('generateMetadata error', e);
    return {};
  }
}

export default async function Page({ params }: { params: { slug: string } }) {
  const { article } = await datoRequest<{ article: any }>(ARTICLE_BY_SLUG, { slug: params.slug });
  if (!article) notFound();

  return (
    <main className="prose mx-auto">
      <h1>{article.title}</h1>
      {/* Si tu utilises Structured Text React:
         import { StructuredText } from 'react-datocms';
         <StructuredText data={article.content} />
      */}
      {article.image?.url && (
        // next/image conseillé, simplifié ici :
        <img src={article.image.url} alt={article.image.alt ?? ''} />
      )}
    </main>
  );
}
