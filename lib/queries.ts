// lib/queries.ts
export const ARTICLE_SLUGS_QUERY = /* GraphQL */ `
  {
    allArticles {
      slug
    }
  }
`;

export const ARTICLE_BY_SLUG_QUERY = /* GraphQL */ `
  query ArticleBySlug($slug: String) {
    article(filter: { slug: { eq: $slug } }) {
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
