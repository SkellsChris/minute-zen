// components/FaqBlock.tsx
import type { FaqBlock } from '@/lib/types';

export default function FaqBlock({ item }: { item: FaqBlock }) {
  return (
    <div className="rounded-2xl border p-4 my-6">
      <h3 className="text-lg font-semibold mb-2">{item.question}</h3>
      <div className="prose whitespace-pre-wrap">
        {JSON.stringify(item.reponse?.value, null, 2)}
      </div>
    </div>
  );
}
