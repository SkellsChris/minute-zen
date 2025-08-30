// lib/queries.ts

export const ALL_SLUGS = /* GraphQL */ `
  query AllSlugs($locale: SiteLocale) {
    allArticles(first: 200, orderBy: _firstPublishedAt_DESC, locale: $locale) {
      slug
    }
  }
`;

// lib/queries.ts (ne change pas ALL_SLUGS / ALL_ARTICLES_QUERY)

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

      auteur {
        nom
        imageauteur { url alt title }
        bio
      }

      # Contenu principal (sans blocks pour le moment)
      content {
        value
      }

      # FAQ (block 'faqdetails' avec question + reponse)
      faq {
        __typename
        ... on FaqdetailsRecord {
          id
          question
          reponse { value }
        }
      }

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
