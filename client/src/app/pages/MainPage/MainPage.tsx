import React, { FC } from 'react';

import { Main } from '@app/features/Main';
import { MainLayout } from '@app/layouts';

export const MainPage: FC = () => {
  return (
    <MainLayout>
      <Main />
    </MainLayout>
  );
};
