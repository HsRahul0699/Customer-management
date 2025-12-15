import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client';
import { SetContextLink } from '@apollo/client/link/context';
import awsconfig from '../config/awsconfig';

const httpLink = new HttpLink({
  uri: awsconfig.aws_appsync_graphqlEndpoint,
});

const authLink = new SetContextLink(({ headers }) => {
  return {
    headers: {
      ...headers,
      'x-api-key': awsconfig.aws_appsync_apiKey,
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
  defaultOptions: {
    watchQuery: {
      fetchPolicy: 'cache-and-network',
    },
  },
});

export default client;
