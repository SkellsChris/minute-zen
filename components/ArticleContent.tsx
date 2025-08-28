// components/ArticleContent.tsx
import { StructuredText, renderNodeRule } from 'react-datocms';
import type { Article, FaqBlock } from '@/lib/types';
import FaqBlockComp from './FaqBlock';

export default function ArticleContent({ article }: { article: Article }) {
  const blocks = article.content?.blocks || [];
  return (
    <StructuredText
      data={article.content?.value}
      renderBlock={({ record }) => {
        if (record.__typename === 'FaqRecord') {
          const b = record as FaqBlock;
          return <FaqBlockComp key={b.id} item={b} />;
        }
        return null;
      }}
    />
  );
}
