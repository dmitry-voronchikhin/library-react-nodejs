import React from 'react';

import { LoginLayout, NotFound } from '@app/layouts';
import { Role } from '@app/api/types';
import { LoginForm } from '@app/components/LoginForm';
import { BooksTable } from '@app/components/BooksTable';
import { MainLayout } from '@app/layouts/MainLayout';
import { Route } from './types';
import { MainPage } from '@app/pages/MainPage';

const LoginPage: JSX.Element = (
  <LoginLayout>
    <LoginForm />
  </LoginLayout>
);

const Main: JSX.Element = (
  <MainLayout>
    <MainPage />
  </MainLayout>
);

const Books: JSX.Element = (
  <MainLayout>
    <BooksTable />
  </MainLayout>
);

const NotFoundPage: JSX.Element = <NotFound />;

export const getRoutes: (isAuth: boolean) => Route[] = (isAuth) => [
  ...(!isAuth
    ? [
        {
          name: 'Авторизация',
          path: '/login',
          component: LoginPage,
          inNav: false,
          roles: null,
          isPrivate: false,
        },
      ]
    : []),
  {
    name: 'Главная',
    path: '/',
    component: Main,
    inNav: true,
    roles: [Role.ADMIN, Role.READER],
    isPrivate: true,
    index: true,
  },
  {
    name: 'Книги',
    path: '/books',
    component: Books,
    inNav: true,
    roles: [Role.ADMIN, Role.READER],
    isPrivate: true,
  },
  {
    name: '404',
    path: '*',
    component: NotFoundPage,
    inNav: false,
    roles: [],
    isPrivate: true,
  },
];
