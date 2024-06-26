import 'react-loading-skeleton/dist/skeleton.css';
import React, { FC, createContext, useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import { ApolloProvider } from '@apollo/client';

import { Store } from '@store/store';
import { AppRoutes } from '@components';
import { createApolloClient } from './graphql/client';

const REFRESH_TOKEN_TIMEOUT = 1000 * 60 * 10;

const store = new Store();

interface AppContext {
  store: Store;
}
export const Context = createContext<AppContext>({ store });

const apolloClient = createApolloClient();

export const App: FC = observer(() => {
  const isAuth = store.checkAuth();

  useEffect(() => {
    let intervalId: NodeJS.Timer | null = null;
    if (isAuth) {
      intervalId = setInterval(store.refreshToken, REFRESH_TOKEN_TIMEOUT);
    }

    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [isAuth]);

  return (
    <ApolloProvider client={apolloClient}>
      <Context.Provider value={{ store }}>
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </Context.Provider>
    </ApolloProvider>
  );
});
