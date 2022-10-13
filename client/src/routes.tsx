import React from 'react';

import { LoginLayout } from '@app/layouts';
import { Role } from '@app/api/types';
import { LoginForm } from '@app/components';

const Login: JSX.Element = (
  <LoginLayout>
    <LoginForm />
  </LoginLayout>
);

export type Route = {
  name: string;
  path: string;
  inNav: boolean;
  component: JSX.Element;
  roles: Role[];
};

export const routes = [
  {
    name: 'Авторизация',
    path: '/login',
    component: Login,
    inNav: false,
    roles: [],
  },
];
