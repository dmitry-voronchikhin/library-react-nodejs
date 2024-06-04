import { Readers } from '@app/features/Readers';
import { MainLayout } from '@app/layouts';
import React, { FC } from 'react';

export const ReadersPage: FC = () => {
  return (
    <MainLayout>
      <Readers />
    </MainLayout>
  );
};
