import React, { FC, createContext, useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { observer } from 'mobx-react-lite';

import { Store } from '@store/store';
import { AppRoutes } from '@components';

const store = new Store();

interface AppContext {
  store: Store;
}
export const Context = createContext<AppContext>({ store });

const AppComponent: FC = () => {
  useEffect(() => {
    store.checkAuth();
  }, []);

  return (
    <Context.Provider value={{ store }}>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </Context.Provider>
  );
};

export const App = observer(AppComponent);
