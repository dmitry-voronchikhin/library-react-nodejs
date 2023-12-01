import React, { FC } from 'react';

import { BooksTable } from './BooksTable';
import { AddBookForm } from './AddBookForm';

export const BooksPage: FC = () => {
  return (
    <div>
      <AddBookForm />
      <BooksTable />
    </div>
  );
};
