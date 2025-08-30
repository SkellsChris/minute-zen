// app/blog/page.tsx
import { getAllArticles } from '@/lib/datocms';
import TopStrip from '@/components/TopStrip';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Seo from '@/components/Seo';
import Image from 'next/image';
import Link from 'next/link';
import type { Article } from '@/lib/types';

// We only need a subset of Article fields for the listing
interface ArticleListItem extends Pick<Article, 'title' | 'slug' | 'lecture' | 'image'> {}

export const revalidate = 60;

const LOCALE = process.env.DEFAULT_LOCALE || 'fr';

export default async function BlogIndex() {
  let articles: ArticleListItem[] = [];
  try {
    articles = await getAllArticles(LOCALE);
  } catch (e) {
    console.error('getAllArticles error', e);
  }

  return (
    <>
      <Seo tags={[]} titleFallback="Blog – MinuteZen" />
      <TopStrip />
      <Header />
      <main className="mx-auto max-w-5xl px-4 py-16">
        <h1 className="mb-8 text-3xl font-bold">Blog</h1>
        <div className="grid gap-8 md:grid-cols-2">
          {articles.map((article) => (
            <article
              key={article.slug}
              className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm"
            >
              {article.image?.responsiveImage && (
                <Image
                  src={article.image.responsiveImage.src}
                  alt={article.image.responsiveImage.alt ?? article.title}
                  width={article.image.responsiveImage.width}
                  height={article.image.responsiveImage.height / 2}
                  sizes={article.image.responsiveImage.sizes}
                  className="w-full"
                />
              )}
              <div className="p-6">
                <h2 className="text-xl font-semibold">
                  <Link href={`/blog/${article.slug}`} prefetch className="hover:underline">
                    {article.title}
                  </Link>
                </h2>
                {typeof article.lecture === 'number' && (
                  <p className="mt-2 text-sm text-slate-600">{article.lecture} min read</p>
                )}
              </div>
            </article>
          ))}
        </div>
      </main>
      <Footer />
    </>
  );
}
