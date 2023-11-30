import React from 'react';

import { LoginLayout, NotFound } from '@app/layouts';
import { Role } from '@app/api/types';
import { LoginForm } from '@app/components/LoginForm';
import { MainLayout } from '@app/layouts/MainLayout';
import { Route } from './types';
import { MainPage } from '@app/pages/MainPage';
import { PublishingHouseTable } from '../PublishingHouseTable';
import { BooksPage } from '@app/pages/BooksPage';

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
    <BooksPage />
  </MainLayout>
);

const PublishingHouses: JSX.Element = (
  <MainLayout>
    <PublishingHouseTable />
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
    name: 'Издательства',
    path: '/publishing-houses',
    component: PublishingHouses,
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
