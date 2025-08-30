// lib/queries.ts

export const ALL_SLUGS = /* GraphQL */ `
  query AllSlugs($locale: SiteLocale) {
    allArticles(first: 200, orderBy: _firstPublishedAt_DESC, locale: $locale) {
      slug
    }
  }
`;

export const ARTICLE_BY_SLUG = /* GraphQL */ `
  query ArticleBySlug($slug: String!, $locale: SiteLocale!) {
    article(filter: { slug: { eq: $slug } }, locale: $locale) {
      id
      title
      slug
      lecture

      image {
        responsiveImage(imgixParams: { auto: format, fit: crop, w: 1200 }) {
          src
          srcSet
          sizes
          width
          height
          alt
          title
          base64
        }
      }
content {
  value
  blocks {
    __typename
    ... on FaqdetailRecord {
      id
      question
      reponse { value }
    }
  }
}
      auteur {
        nom
        imageauteur { url alt title }
        bio
      }

      # Structured Text SANS blocks pour le moment (on réactive après)
      content {
        value
      }

      # IMPORTANT: pas d'alias "seo: _seoMetaTags" (risque de conflit avec le champ "seo")
      seoMeta: _seoMetaTags { tag attributes content }
    }
  }
`;

export const ALL_ARTICLES_QUERY = /* GraphQL */ `
  query AllArticles($first: IntType, $skip: IntType, $locale: SiteLocale) {
    allArticles(first: $first, skip: $skip, orderBy: _firstPublishedAt_DESC, locale: $locale) {
      title
      slug
      lecture
      image {
        responsiveImage(imgixParams: { auto: format, fit: crop, w: 800, h: 400 }) {
          src
          srcSet
          sizes
          width
          height
          alt
          title
          base64
        }
      }
    }
  }
`;
