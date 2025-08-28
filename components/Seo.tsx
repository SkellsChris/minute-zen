// components/Seo.tsx
import Head from 'next/head';
import type { SeoTag } from '@/lib/types';

export default function Seo({ tags, titleFallback }: { tags: SeoTag[]; titleFallback?: string }) {
  return (
    <Head>
      {titleFallback && <title>{titleFallback}</title>}
      {tags?.map((tag, i) => {
        const T = tag.tag as keyof JSX.IntrinsicElements;
        // DatoCMS _seoMetaTags renvoie soit <meta ...>, <title>, <link>, etc.
        return <T key={i} {...(tag.attributes || {})}>{tag.content || null}</T>;
      })}
    </Head>
  );
}
