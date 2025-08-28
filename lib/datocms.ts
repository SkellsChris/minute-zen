import { GraphQLClient } from 'graphql-request'

const endpoint = 'https://graphql.datocms.com/'

export const client = new GraphQLClient(endpoint, {
  headers: {
    Authorization: `Bearer ${process.env.DATOCMS_API_TOKEN}`,
  },
})
