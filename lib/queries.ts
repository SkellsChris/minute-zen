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
    article(
      filter: { slug: { eq: $slug } }
      locale: $locale
      # pas de fallback, ton site est en FR uniquement pour l’instant
    ) {
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

      auteur {
        nom
        imageauteur { url alt title }
        bio
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

      faq {
        __typename
        ... on FaqdetailRecord {
          id
          question
          reponse { value }
        }
      }

      _seoMetaTags { tag attributes content }
    }
  }
`;
