import React, { FC, createContext, useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { observer } from 'mobx-react-lite';

import { Store } from '@store/store';
import { AppRoutes } from '@components';
import { createApolloClient } from './graphql/client';
import { ApolloProvider } from '@apollo/client';

const REFRESH_TOKEN_TIMEOUT = 1000 * 60 * 15;

const store = new Store();

interface AppContext {
  store: Store;
}
export const Context = createContext<AppContext>({ store });

const apolloClient = createApolloClient();

const AppComponent: FC = () => {
  const isAuth = store.checkAuth();

  useEffect(() => {
    let intervalId: NodeJS.Timer | null = null;
    if (isAuth) {
      intervalId = setInterval(() => {
        store.refreshToken();
      }, REFRESH_TOKEN_TIMEOUT);
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
};

export const App = observer(AppComponent);
