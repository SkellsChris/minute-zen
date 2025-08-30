// app/blog/[slug]/page.tsx
import { notFound } from 'next/navigation';
import { datoRequest } from '@/lib/datocms';
import { ALL_SLUGS, ARTICLE_BY_SLUG } from '@/lib/queries';
import { StructuredText } from 'react-datocms';

export const runtime = 'nodejs';
export const revalidate = 60;
export const dynamicParams = true;

const LOCALE = process.env.DEFAULT_LOCALE ?? 'fr';

type Slug = { slug: string };

export async function generateStaticParams() {
  try {
    const data = await datoRequest<{ allArticles: Slug[] }>(ALL_SLUGS, { locale: LOCALE });
    return data.allArticles.map((a) => ({ slug: a.slug }));
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
  const auteur = article.auteur;

  return (
    <main className="prose mx-auto px-4 py-12">
      <h1 className="mb-2">{article.title}</h1>

      {/* lecture (optionnel) */}
      {typeof article.lecture === 'number' && (
        <p className="mt-0 text-sm text-slate-600">{article.lecture} min de lecture</p>
      )}

      {/* Bloc auteur : avatar + nom + bio */}
      {auteur && (
        <aside className="not-prose my-6 flex items-start gap-4 rounded-xl border border-slate-200 p-4">
          {auteur.imageauteur?.url && (
            <img
              src={auteur.imageauteur.url}
              alt={auteur.imageauteur.alt ?? auteur.nom ?? 'Auteur'}
              width={56}
              height={56}
              className="h-14 w-14 rounded-full object-cover"
            />
          )}
          <div>
            {auteur.nom && <p className="m-0 font-medium">par {auteur.nom}</p>}
            {auteur.bio && (
              <p className="m-0 mt-1 text-sm text-slate-600 whitespace-pre-line">{auteur.bio}</p>
            )}
          </div>
        </aside>
      )}

      {/* Image principale */}
      {rimg?.src && (
        <img
          src={rimg.src}
          alt={rimg.alt ?? ''}
          width={rimg.width}
          height={rimg.height}
        />
      )}

      {/* Contenu principal (Structured Text) */}
      {article.content?.value && (
        <div className="prose max-w-none mt-8">
          <StructuredText data={article.content} />
        </div>
      )}
    </main>
  );
}
