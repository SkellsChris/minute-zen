// components/AuthorBio.tsx
import Image from 'next/image';
import type { Author } from '@/lib/types';

export default function AuthorBio({ author }: { author: Author }) {
  if (!author) return null;
  return (
    <aside className="mt-10 flex items-center gap-4 p-4 rounded-2xl border">
      {author.avatar?.url && (
        <Image
          src={author.avatar.url}
          alt={author.avatar.alt || author.name}
          width={64}
          height={64}
          className="rounded-full"
        />
      )}
      <div>
        <p className="font-semibold">{author.name}</p>
        {author.jobTitle && <p className="text-sm opacity-80">{author.jobTitle}</p>}
        {author.bio && <p className="text-sm mt-2">{author.bio}</p>}
      </div>
    </aside>
  );
}
