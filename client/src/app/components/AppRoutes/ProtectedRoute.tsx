import { Context } from '@app/App';
import React, { FC, ReactElement, useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';

export const ProtectedRoute: FC<{
  isPrivate: boolean;
  children: ReactElement;
}> = ({ isPrivate, children }) => {
  const location = useLocation();
  const { store } = useContext(Context);

  if (isPrivate && !store.isAuth) {
    return <Navigate to="login" replace state={{ from: location }} />;
  }

  return children;
};
