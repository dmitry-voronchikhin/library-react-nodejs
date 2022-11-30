import {
  ApolloClient,
  ApolloLink,
  createHttpLink,
  InMemoryCache,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

export const createApolloClient = () => {
  const cache = new InMemoryCache();
  const API_URL = 'http://localhost:5000/graphql';

  const httpLink = createHttpLink({
    uri: API_URL,
  });

  const authLink = setContext((_, { headers }) => {
    const token = sessionStorage.getItem('token');
    return {
      headers: {
        ...headers,
        authorization: token ? `Bearer ${token}` : '',
      },
    };
  });

  const apolloLink = ApolloLink.from([authLink, httpLink]);

  return new ApolloClient({
    cache: cache,
    queryDeduplication: false,
    link: apolloLink,
    connectToDevTools: true,
    defaultOptions: {
      query: {
        fetchPolicy: 'cache-first',
        errorPolicy: 'all',
      },
      mutate: {
        fetchPolicy: 'network-only',
        errorPolicy: 'all',
      },
      watchQuery: {
        fetchPolicy: 'cache-and-network',
        errorPolicy: 'all',
      },
    },
  });
};
