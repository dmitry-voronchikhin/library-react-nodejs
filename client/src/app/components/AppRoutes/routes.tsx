import React from 'react';

import { LoginLayout, NotFound } from '@app/layouts';
import { Role } from '@app/api/types';
import { LoginForm } from '@app/components';
import { MainLayout } from '@app/layouts/MainLayout';
import { Route } from './types';

const LoginPage: JSX.Element = (
  <LoginLayout>
    <LoginForm />
  </LoginLayout>
);

const MainPage: JSX.Element = (
  <MainLayout>
    <div>
      <h1>Main page</h1>
    </div>
  </MainLayout>
);

const NotFoundPage: JSX.Element = <NotFound />;

export const routes: Route[] = [
  {
    name: 'Авторизация',
    path: '/login',
    component: LoginPage,
    inNav: false,
    roles: [],
    isPrivate: false,
  },
  {
    name: 'Главная',
    path: '/',
    component: MainPage,
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
