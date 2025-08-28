// components/ArticleContent.tsx
import type { Article } from '@/lib/types';

export default function ArticleContent({ article }: { article: Article }) {
  // Rendering of structured content from DatoCMS is not available without external dependencies.
  // For now, output the raw JSON for debugging purposes.
  return <pre className="whitespace-pre-wrap">{JSON.stringify(article.content?.value, null, 2)}</pre>;
}
