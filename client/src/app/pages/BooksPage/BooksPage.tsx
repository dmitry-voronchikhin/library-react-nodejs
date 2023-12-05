import React, { FC } from 'react';

import { BooksTable } from './BooksTable';
import { AddBookForm } from './AddBookForm';
import { MainLayout } from '@app/layouts';

export const BooksPage: FC = () => {
  return (
    <MainLayout>
      <AddBookForm />
      <BooksTable />
    </MainLayout>
  );
};
