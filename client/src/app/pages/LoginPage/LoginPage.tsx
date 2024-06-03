import React, { FC } from 'react';

import { LoginLayout } from '@app/layouts';
import { Login } from '@app/features/Login';

export const LoginPage: FC = () => {
  return (
    <LoginLayout>
      <Login />
    </LoginLayout>
  );
};
