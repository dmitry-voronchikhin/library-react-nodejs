import React, { FC, createContext } from 'react';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';

import { Store } from '@store/store';
import { routes } from '../routes';

const store = new Store();

interface State {
  store: Store;
}
export const Context = createContext<State>({ store });

export const App: FC = () => {
  return (
    <Context.Provider value={{ store }}>
      <BrowserRouter>
        <Routes>
          {routes.map((route) => {
            return (
              <Route
                key={route.name}
                path={route.path}
                element={route.component}
              />
            );
          })}
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      </BrowserRouter>
    </Context.Provider>
  );
};
