import fetch from 'cross-fetch';
import {
  ApolloClient,
  ApolloLink,
  createHttpLink,
  fromPromise,
  InMemoryCache,
} from '@apollo/client';
import { ErrorLink } from '@apollo/client/link/error';
import { setContext } from '@apollo/client/link/context';
import { RetryLink } from '@apollo/client/link/retry';

import { tokenRequest } from '@app/api/user/token.request';

export const createApolloClient = () => {
  const cache = new InMemoryCache();
  const API_URL = 'http://localhost:5000/graphql';

  const httpLink = createHttpLink({
    uri: API_URL,
    fetch,
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

  const errorLink = new ErrorLink(({ graphQLErrors, operation, forward }) => {
    if (graphQLErrors) {
      graphQLErrors.forEach((err) => {
        switch (err.extensions.code) {
          case 'UNAUTHENTICATED':
            return fromPromise(
              tokenRequest.refresh().then((response) => {
                sessionStorage.setItem('token', response.data.accessToken);
                return response.data.accessToken;
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

  const retryLink = new RetryLink({
    delay: {
      initial: 300,
      max: Infinity,
      jitter: true,
    },
    attempts: {
      max: 5,
      retryIf: (error) => !!error,
    },
  });

  const apolloLink = ApolloLink.from([
    retryLink,
    authLink,
    errorLink,
    requestParamsLink,
    httpLink,
  ]);

  return new ApolloClient({
    cache,
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
