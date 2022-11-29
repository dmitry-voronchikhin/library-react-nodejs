import React, { FC, useContext } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { observer } from 'mobx-react-lite';

import { routes } from '@app/components/AppRoutes/routes';
import { Context } from '@app/App';

const AppRoutesComponent: FC = () => {
  const { store } = useContext(Context);

  return (
    <Routes>
      {routes.map((route) => {
        if (route.isPrivate && !store.isAuth) {
          return (
            <Route
              key="login"
              path="*"
              element={<Navigate to="/login" replace />}
            />
          );
        }

        return (
          <Route key={route.name} path={route.path} element={route.component} />
        );
      })}
    </Routes>
  );
};

export const AppRoutes = observer(AppRoutesComponent);
