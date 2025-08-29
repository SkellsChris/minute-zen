import { notFound } from 'next/navigation';
import Image from 'next/image';
import { datoRequest } from '@/lib/datocms';
import { ALL_SLUGS, ARTICLE_BY_SLUG } from '@/lib/queries';
import type { Article } from '@/lib/types';
import TopStrip from '@/components/TopStrip';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Seo from '@/components/Seo';
import ArticleContent from '@/components/ArticleContent';
import AuthorBio from '@/components/AuthorBio';
import FaqBlock from '@/components/FaqBlock';

export const runtime = 'nodejs';
export const revalidate = 60;
// Laisse dynamicParams à true (par défaut). Ne PAS mettre dynamicParams = false.

const LOCALE = process.env.DEFAULT_LOCALE || 'fr';

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
  let article: Article | null = null;

  try {
    ({ article } = await datoRequest<{ article: Article }>(
      ARTICLE_BY_SLUG,
      { slug: params.slug, locale: LOCALE }
    ));
  } catch (e) {
    // En cas d'erreur de récupération (ex. DatoCMS indisponible),
    // on journalise l'erreur mais on renvoie une 404 pour éviter
    // de faire tomber l'application avec une 500.
    console.error('article fetch error', e);
    notFound();
  }

  if (!article) {
    console.error('Article introuvable pour slug:', params.slug, 'locale:', LOCALE);
    notFound();
  }

  return (
    <>
      <Seo tags={article.seo} titleFallback={article.title} />
      <TopStrip />
      <Header />
      <main className="mx-auto max-w-3xl px-4 py-16">
        <h1 className="mb-6 text-3xl font-bold">{article.title}</h1>
        {article.image?.responsiveImage && (
          <Image
            src={article.image.responsiveImage.src}
            alt={article.image.responsiveImage.alt ?? article.title}
            width={article.image.responsiveImage.width}
            height={article.image.responsiveImage.height}
            sizes={article.image.responsiveImage.sizes}
            className="mb-8 w-full"
          />
        )}
        <ArticleContent article={article} />
        {article.auteur && <AuthorBio author={article.auteur} />}
        {article.faq?.map(f => (
          <FaqBlock key={f.id} item={f} />
        ))}
      </main>
      <Footer />
    </>
  );
}
