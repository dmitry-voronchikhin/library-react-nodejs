import React, { FC } from 'react';

import { LoginForm } from './LoginForm';
import { LoginLayout } from '@app/layouts';

export const LoginPage: FC = () => {
  return (
    <LoginLayout>
      <LoginForm />
    </LoginLayout>
  );
};
