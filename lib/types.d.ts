// lib/types.d.ts
export interface SeoTag {
  tag: string;
  content?: string | null;
  attributes?: Record<string, string>;
}

export interface ResponsiveImage {
  src: string;
  srcSet: string;
  sizes: string;
  width: number;
  height: number;
  alt?: string | null;
  title?: string | null;
  base64?: string | null;
}

export interface Author {
  name: string;
  jobTitle?: string | null;
  bio?: string | null;
  avatar?: { url: string; alt?: string | null } | null;
}

export interface FaqBlock {
  __typename: 'FaqRecord';
  id: string;
  question: string;
  reponse: { value: any }; // StructuredText JSON
}

export interface Article {
  title: string;
  slug: string;
  lecture?: number | null;
  seo: SeoTag[];
  image?: { responsiveImage: ResponsiveImage } | null;
  auteur?: Author | null;
  content: {
    value: any; // StructuredText JSON
    blocks?: Array<FaqBlock>;
  };
  faq?: Array<FaqBlock> | null;
}
