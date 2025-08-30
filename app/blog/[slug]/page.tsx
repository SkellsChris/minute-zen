// app/blog/[slug]/page.tsx
import { notFound } from 'next/navigation';
import { datoRequest } from '@/lib/datocms';
import { ALL_SLUGS, ARTICLE_BY_SLUG } from '@/lib/queries';
import StructuredText from '@/components/StructuredText';
export const runtime = 'nodejs';
export const revalidate = 60;
// Utile si un parent a mis dynamicParams = false
export const dynamicParams = true;

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
  let data: { article: any } | null = null;

  try {
    data = await datoRequest<{ article: any }>(ARTICLE_BY_SLUG, {
      slug: params.slug,
      locale: LOCALE,
    });
  } catch (e) {
    console.error('ARTICLE_BY_SLUG error', e);
    return notFound();
  }

  const article = data?.article;
  if (!article) return notFound();

  const rimg = article.image?.responsiveImage;

  return (
    <main className="prose mx-auto px-4 py-12">
      <h1>{article.title}</h1>

      {article.auteur?.nom && (
        <p className="mt-0 text-sm text-slate-600">
          par {article.auteur.nom}
        </p>
      )}

      {article.content?.value && (
  <div className="prose max-w-none mt-8">
    <StructuredText data={article.content} />
  </div>
)}

      {article.auteur?.imageauteur?.url && (
        <img
          src={article.auteur.imageauteur.url}
          alt={article.auteur.imageauteur.alt ?? ''}
          width={64}
          height={64}
          style={{ borderRadius: '9999px' }}
        />
      )}

      {rimg?.src && (
        <img
          src={rimg.src}
          alt={rimg.alt ?? ''}
          width={rimg.width}
          height={rimg.height}
        />
      )}

      {/* TODO: rendre le Structured Text si besoin */}
      {/* article.content?.value … */}
    </main>
  );
}
