import {
  ApolloClient,
  ApolloLink,
  createHttpLink,
  fromPromise,
  InMemoryCache,
} from '@apollo/client';
import { onError } from '@apollo/client/link/error';
import { setContext } from '@apollo/client/link/context';
import { tokenRequest } from '@app/api/user/token.request';

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

  const requestParamsLink = setContext(({ operationName }) => {
    const opNameUri = `${API_URL}?operation=${operationName}`;
    return {
      uri: opNameUri,
    };
  });

  const errorLink = onError(({ graphQLErrors, operation, forward }) => {
    if (graphQLErrors) {
      graphQLErrors.forEach((err) => {
        switch (err.extensions.code) {
          case 'UNAUTHENTICATED':
            return fromPromise(
              tokenRequest.refresh().then((response) => {
                sessionStorage.setItem('token', response.data.accessToken);
              }),
            )
              .filter((value) => Boolean(value))
              .flatMap((accessToken) => {
                const oldHeaders = operation.getContext().headers;
                operation.setContext({
                  headers: {
                    ...oldHeaders,
                    authorization: `Bearer ${accessToken}`,
                  },
                });

                return forward(operation);
              });
        }
      });
    }
  });

  const apolloLink = ApolloLink.from([
    authLink,
    errorLink,
    requestParamsLink,
    httpLink,
  ]);

  return new ApolloClient({
    cache: cache,
    queryDeduplication: true,
    link: apolloLink,
    uri: API_URL,
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
