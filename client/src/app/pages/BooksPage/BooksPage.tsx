import React, { FC } from 'react';

import { MainLayout } from '@app/layouts';
import { Books } from '@app/features/Books';

export const BooksPage: FC = () => {
  return (
    <MainLayout>
      <Books />
    </MainLayout>
  );
};
