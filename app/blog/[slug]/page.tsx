// app/blog/[slug]/page.tsx
import Link from 'next/link';
import Image from 'next/image';
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

/** RENDERER minimal Structured Text (headings + paragraphs) */
function RenderStructured({ data }: { data: any }) {
  const doc = data?.value?.document;
  if (!doc?.children) return null;

  return (
    <>
      {doc.children.map((node: any, i: number) => {
        const text = (node.children ?? []).map((c: any) => c?.value ?? '').join('').trim();
        if (!text) return null;

        if (node.type === 'heading') {
          const level = Math.min(node.level ?? 2, 6);
          const Tag = (`h${level}` as unknown) as keyof JSX.IntrinsicElements;
          return <Tag key={i}>{text}</Tag>;
        }
        if (node.type === 'paragraph') return <p key={i}>{text}</p>;
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
    <div className="min-h-screen bg-gradient-to-b from-emerald-50 via-white to-white">
      {/* Bande décorative douce */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-64 bg-[radial-gradient(60%_60%_at_50%_0%,rgba(16,185,129,0.18),transparent)]"
      />

      <main className="mx-auto max-w-3xl px-4 py-10 md:py-14">
        {/* Fil d’Ariane / retour */}
        <div className="mb-6 flex items-center justify-between">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 rounded-full border border-emerald-200/70 bg-white/70 px-3 py-1 text-sm text-emerald-700 transition hover:bg-white"
          >
            ← Retour au blog
          </Link>

          {typeof article.lecture === 'number' && (
            <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-medium text-emerald-800">
              {article.lecture} min de lecture
            </span>
          )}
        </div>

        {/* Titre */}
        <h1 className="mb-3 text-3xl font-semibold leading-tight text-slate-900 md:text-4xl">
          <span className="bg-gradient-to-r from-emerald-700 to-teal-600 bg-clip-text text-transparent">
            {article.title}
          </span>
        </h1>

        {/* Image de couverture */}
        {rimg?.src && (
          <div className="my-6 overflow-hidden rounded-2xl ring-1 ring-emerald-100 shadow">
            <Image
              src={rimg.src}
              alt={rimg.alt ?? ''}
              width={rimg.width}
              height={rimg.height}
              sizes="(max-width: 768px) 100vw, 768px"
              className="h-auto w-full"
            />
          </div>
        )}

        {/* Contenu de l’article */}
        {article.content?.value && (
          <article className="prose prose-slate prose-lg max-w-none prose-a:text-emerald-700 prose-blockquote:border-emerald-200 prose-blockquote:text-slate-700 prose-hr:border-emerald-100">
            <RenderStructured data={article.content} />
          </article>
        )}

        {/* Séparateur doux */}
        <hr className="my-10 border-emerald-100" />

        {/* FAQ zen */}
        {Array.isArray(article.faq) && article.faq.length > 0 && (
          <section className="max-w-none">
            <h2 className="mb-4 text-2xl font-semibold text-slate-900">FAQ</h2>
            <div className="space-y-3">
              {article.faq.map((f: any) => (
                <details
                  key={f.id}
                  className="group rounded-2xl border border-emerald-100 bg-white/70 p-4 shadow-sm transition hover:shadow-md"
                >
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-base font-medium text-slate-900">
                    <span>{f.question}</span>
                    <span className="shrink-0 rounded-full border border-emerald-200 bg-emerald-50 px-2 py-0.5 text-xs text-emerald-700 transition group-open:rotate-45">
                      +
                    </span>
                  </summary>
                  <div className="prose prose-slate mt-3 max-w-none prose-a:text-emerald-700">
                    <RenderStructured data={f.reponse} />
                  </div>
                </details>
              ))}
            </div>
          </section>
        )}

        {/* Auteur (déplacé après la FAQ) */}
        {auteur && (
          <aside className="not-prose mt-10 flex items-start gap-4 rounded-2xl border border-emerald-100 bg-white/70 p-4 shadow-sm">
            {auteur.imageauteur?.url && (
              <img
                src={auteur.imageauteur.url}
                alt={auteur.imageauteur.alt ?? auteur.nom ?? 'Auteur'}
                width={56}
                height={56}
                className="h-14 w-14 rounded-full object-cover ring-2 ring-emerald-100"
              />
            )}
            <div>
              {auteur.nom && <p className="m-0 font-medium text-slate-900">par {auteur.nom}</p>}
              {auteur.bio && (
                <p className="m-0 mt-1 text-sm text-slate-600 whitespace-pre-line">{auteur.bio}</p>
              )}
            </div>
          </aside>
        )}

        {/* Fin */}
        <div className="mt-12 text-center text-sm text-slate-500">
          Prenez un moment pour respirer profondément. 🧘‍♂️
        </div>
      </main>
    </div>
  );
}
