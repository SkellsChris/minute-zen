export const ALL_SLUGS = /* GraphQL */ `
  query AllSlugs($locale: SiteLocale) {
    allArticles(first: 200, orderBy: _firstPublishedAt_DESC, locale: $locale) {
      slug
    }
  }
`;

export const ARTICLE_BY_SLUG = /* GraphQL */ `
  query ArticleBySlug($slug: String, $locale: SiteLocale) {
    article(filter: { slug: { eq: $slug } }, locale: $locale, fallbackLocales: all) {
      title
      slug
      lecture
      seo: _seoMetaTags { attributes content tag }
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
      auteur {
        name
        jobTitle
        avatar { url alt }
        bio
      }
      content {
        value
        blocks {
          __typename
          ... on FaqRecord {
            id
            question
            reponse { value }
          }
        }
      }
      faq {
        __typename
        ... on FaqRecord {
          id
          question
          reponse { value }
        }
      }
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
