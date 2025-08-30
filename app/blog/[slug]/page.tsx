// app/blog/[slug]/page.tsx
import { notFound } from 'next/navigation';
import { datoRequest } from '@/lib/datocms';
import { ALL_SLUGS, ARTICLE_BY_SLUG } from '@/lib/queries';

export const runtime = 'nodejs';
export const revalidate = 60;
export const dynamicParams = true;

const LOCALE = process.env.DEFAULT_LOCALE ?? 'fr';

type Slug = { slug: string };

export async function generateStaticParams() {
  try {
    const data = await datoRequest<{ allArticles: Slug[] }>(ALL_SLUGS, { locale: LOCALE });
    return data.allArticles.map((a) => ({ slug: a.slug }));
  } catch {
    return [];
  }
}

// --- RENDERER SÛR POUR STRUCTURED TEXT (paragraphe/heading) ---
function RenderStructured({ data }: { data: any }) {
  const doc = data?.value?.document;
  if (!doc?.children) return null;

  return (
    <>
      {doc.children.map((node: any, i: number) => {
        const text =
          (node.children ?? [])
            .map((c: any) => c?.value ?? '')
            .join('')
            .trim();

        if (!text) return null;

        if (node.type === 'heading') {
          const level = Math.min(node.level ?? 2, 6);
          const Tag = (`h${level}` as unknown) as keyof JSX.IntrinsicElements;
          return <Tag key={i}>{text}</Tag>;
        }

        if (node.type === 'paragraph') {
          return <p key={i}>{text}</p>;
        }

        // autres types ignorés pour l’instant
        return null;
      })}
    </>
  );
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

      {typeof article.lecture === 'number' && (
        <p className="mt-0 text-sm text-slate-600">{article.lecture} min de lecture</p>
      )}

      {/* Auteur */}
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

      {/* Contenu de l’article */}
      {article.content?.value && (
        <div className="prose max-w-none mt-8">
          <RenderStructured data={article.content} />
        </div>
      )}
    </main>
  );
}
