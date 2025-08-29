// components/FaqBlock.tsx
import type { FaqBlock } from '@/lib/types';
import { renderStructuredText } from '@/lib/renderStructuredText';

export default function FaqBlock({ item }: { item: FaqBlock }) {
  return (
    <div className="rounded-2xl border p-4 my-6">
      <h3 className="text-lg font-semibold mb-2">{item.question}</h3>
      <div className="prose">{renderStructuredText(item.reponse?.value)}</div>
    </div>
  );
}
