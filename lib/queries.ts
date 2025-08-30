export const ALL_SLUGS = /* GraphQL */ `
  query AllSlugs($locale: SiteLocale) {
    allArticles(first: 200, orderBy: _firstPublishedAt_DESC, locale: $locale) {
      slug
    }
  }
`;

// lib/queries.ts
export const ARTICLE_BY_SLUG = /* GraphQL */ `
  query ArticleBySlug($slug: String!, $locale: SiteLocale!) {
    article(
      filter: { slug: { eq: $slug } }
      locale: $locale
      # ⛔️ on supprime fallbackLocales: all pour le test
    ) {
      id
      title
      slug
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
