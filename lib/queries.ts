// lib/queries.ts
export const ARTICLE_SLUGS_QUERY = /* GraphQL */ `
  query AllArticleSlugs($locale: SiteLocale) {
    allArticles(locale: $locale) {
      slug
    }
  }
`;

export const ARTICLE_BY_SLUG_QUERY = /* GraphQL */ `
  query ArticleBySlug($slug: String, $locale: SiteLocale) {
    article(filter: { slug: { eq: $slug } }, locale: $locale) {
      title
      slug
      lecture
      seo: _seoMetaTags {
        attributes
        content
        tag
      }
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
        avatar {
          url
          alt
        }
        bio
      }
      content {
        value
        blocks {
          __typename
          ... on FaqRecord {
            id
            question
            reponse {
              value
            }
          }
        }
      }
      faq {
        __typename
        ... on FaqRecord {
          id
          question
          reponse {
            value
          }
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

// Alias exports to match the names used throughout the app
export const ALL_SLUGS = ARTICLE_SLUGS_QUERY;
export const ARTICLE_BY_SLUG = ARTICLE_BY_SLUG_QUERY;
