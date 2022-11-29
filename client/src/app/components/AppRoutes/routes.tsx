import React from 'react';

import { LoginLayout } from '@app/layouts';
import { Role } from '@app/api/types';
import { LoginForm } from '@app/components';
import { MainLayout } from '@app/layouts/MainLayout';
import { Route } from './types';

const Login: JSX.Element = (
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

export const routes: Route[] = [
  {
    name: 'Авторизация',
    path: '/login',
    component: Login,
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
];
