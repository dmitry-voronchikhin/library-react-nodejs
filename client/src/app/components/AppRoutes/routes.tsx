import React from 'react';

import { Role } from '@app/api/types';
import { Route } from './types';
import {
  MainPage,
  BooksPage,
  PublishingHousePage,
  LoginPage,
  ReadersPage,
  NotFoundPage,
} from '@app/pages';

export const getRoutes: (isAuth: boolean) => Route[] = (isAuth) => [
  ...(!isAuth
    ? [
        {
          name: 'Авторизация',
          path: '/login',
          component: <LoginPage />,
          inNav: false,
          roles: null,
          isPrivate: false,
        },
      ]
    : []),
  {
    name: 'Главная',
    path: '/',
    component: <MainPage />,
    inNav: true,
    roles: [Role.ADMIN, Role.READER],
    isPrivate: true,
    index: true,
  },
  {
    name: 'Книги',
    path: '/books',
    component: <BooksPage />,
    inNav: true,
    roles: [Role.ADMIN, Role.READER],
    isPrivate: true,
  },
  {
    name: 'Издательства',
    path: '/publishing-houses',
    component: <PublishingHousePage />,
    inNav: true,
    roles: [Role.ADMIN, Role.READER],
    isPrivate: true,
  },
  {
    name: 'Читатели',
    path: '/readers',
    component: <ReadersPage />,
    inNav: true,
    roles: [Role.ADMIN],
    isPrivate: true,
  },
  {
    name: '404',
    path: '*',
    component: <NotFoundPage />,
    inNav: false,
    roles: [],
    isPrivate: true,
  },
];
