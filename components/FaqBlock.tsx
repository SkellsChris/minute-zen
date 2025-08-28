// components/FaqBlock.tsx
import { StructuredText } from 'react-datocms';
import type { FaqBlock } from '@/lib/types';

export default function FaqBlock({ item }: { item: FaqBlock }) {
  return (
    <div className="rounded-2xl border p-4 my-6">
      <h3 className="text-lg font-semibold mb-2">{item.question}</h3>
      <div className="prose">
        <StructuredText data={item.reponse?.value} />
      </div>
    </div>
  );
}
