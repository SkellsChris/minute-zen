// app/blog/[slug]/page.tsx
import { client } from '@/lib/datocms';
import { ARTICLE_BY_SLUG_QUERY, ARTICLE_SLUGS_QUERY } from '@/lib/queries';
import Seo from '@/components/Seo';
import ArticleContent from '@/components/ArticleContent';
import AuthorBio from '@/components/AuthorBio';
import Image from 'next/image';
import type { Article } from '@/lib/types';
import { notFound } from 'next/navigation';

export const revalidate = 60;

export async function generateStaticParams() {
  const data = await client.request(ARTICLE_SLUGS_QUERY);
  return data.allArticles
    .filter((a: { slug?: string | null }) => a.slug)
    .map((a: { slug: string }) => ({ slug: a.slug }));
}

export default async function ArticlePage({ params }: { params: { slug: string } }) {
  const { article } = await client.request(ARTICLE_BY_SLUG_QUERY, { slug: params.slug });
  if (!article) notFound();

  return (
    <>
      <Seo tags={article.seo} titleFallback={article.title} />
      <main className="container mx-auto max-w-3xl px-4 py-10">
        <h1 className="text-3xl font-bold mb-3">{article.title}</h1>
        {typeof article.lecture === 'number' && (
          <p className="text-sm opacity-70 mb-6">{article.lecture} min read</p>
        )}

        {article.image?.responsiveImage && (
          <div className="mb-8 overflow-hidden rounded-2xl">
            <Image
              src={article.image.responsiveImage.src}
              alt={article.image.responsiveImage.alt ?? article.title}
              width={article.image.responsiveImage.width}
              height={article.image.responsiveImage.height}
              sizes={article.image.responsiveImage.sizes}
            />
          </div>
        )}

        <ArticleContent article={article} />

        {/* Section FAQ dédiée si tu veux lister le champ `faq` (en plus des blocks intégrés dans `content`) */}
        {article.faq?.length ? (
          <section className="mt-10">
            <h2 className="text-2xl font-semibold mb-4">FAQ</h2>
            <div>
              {article.faq.map((f) => (
                <div key={f.id} className="mb-6">
                  <h3 className="font-medium mb-2">{f.question}</h3>
                  <ArticleContent
                    // petit hack pour réutiliser le composant (on lui passe une structure minimale)
                    article={{
                      ...article,
                      content: { value: f.reponse.value, blocks: [] },
                    } as Article}
                  />
                </div>
              ))}
            </div>
          </section>
        ) : null}

        <AuthorBio author={article.auteur as any} />
      </main>
    </>
  );
}
