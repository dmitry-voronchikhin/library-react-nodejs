import React, { FC } from 'react';
import { Route, Routes } from 'react-router-dom';
import { observer } from 'mobx-react-lite';

import { routes } from '@app/components/AppRoutes/routes';
import { ProtectedRoute } from './ProtectedRoute';

const AppRoutesComponent: FC = () => {
  return (
    <Routes>
      {routes.map((route) => {
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
