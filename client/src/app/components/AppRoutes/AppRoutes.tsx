import React, { FC, useContext } from 'react';
import { Route, Routes } from 'react-router-dom';
import { observer } from 'mobx-react-lite';

import { getRoutes } from '@app/components/AppRoutes/routes';
import { ProtectedRoute } from './ProtectedRoute';
import { Context } from '@app/App';

const AppRoutesComponent: FC = () => {
  const { store } = useContext(Context);

  const isAuth = store.checkAuth();

  return (
    <Routes>
      {getRoutes(isAuth).map((route) => {
        return (
          <Route
            key={route.name}
            path={route.path}
            element={
              <ProtectedRoute isPrivate={route.isPrivate}>
                {route.component}
              </ProtectedRoute>
            }
            index={route.index}
          />
        );
      })}
    </Routes>
  );
};

export const AppRoutes = observer(AppRoutesComponent);
