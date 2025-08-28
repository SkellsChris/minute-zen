import { ALL_ARTICLES_QUERY } from './queries';

const endpoint = 'https://graphql.datocms.com/';

interface GraphQLResponse<T> {
  data: T;
  errors?: unknown;
}

const token = process.env.DATOCMS_API_TOKEN;

export const client = {
  request: async (query: string, variables?: Record<string, unknown>): Promise<any> => {
    const res = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token ?? ''}`,
      },
      body: JSON.stringify({ query, variables }),
    });

    const json = (await res.json()) as GraphQLResponse<any>;
    if (json.errors) throw new Error(JSON.stringify(json.errors));
    return json.data;
  },
};

export async function getAllArticles() {
  const pageSize = 100;
  let allArticles: any[] = [];
  let skip = 0;

  while (true) {
    const { allArticles: articles } = await client.request(ALL_ARTICLES_QUERY, {
      first: pageSize,
      skip,
    });
    allArticles = allArticles.concat(articles);
    if (articles.length < pageSize) break;
    skip += pageSize;
  }

  return allArticles;
}
