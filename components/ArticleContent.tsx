// components/ArticleContent.tsx
import type { Article } from '@/lib/types';
import { renderStructuredText } from '@/lib/renderStructuredText';
import FaqBlock from './FaqBlock';

export default function ArticleContent({ article }: { article: Article }) {
  return (
    <div className="prose">
      {renderStructuredText(article.content.value, {
        blocks: article.content.blocks,
        renderBlock: (block) => {
          if (block.__typename === 'FaqRecord') {
            return <FaqBlock item={block} />;
          }
          return null;
        },
      })}
    </div>
  );
}
