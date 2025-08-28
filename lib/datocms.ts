const endpoint = 'https://graphql.datocms.com/';

interface GraphQLResponse<T> {
  data: T;
  errors?: unknown;
}

export const client = {
  request: async (query: string, variables?: Record<string, unknown>): Promise<any> => {
    const res = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.DATOCMS_API_TOKEN ?? ''}`,
      },
      body: JSON.stringify({ query, variables }),
    });

    const json = (await res.json()) as GraphQLResponse<any>;
    if (json.errors) throw new Error(JSON.stringify(json.errors));
    return json.data;
  },
};
