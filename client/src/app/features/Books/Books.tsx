import React, { FC } from 'react';

import { AddBookForm } from './AddBookForm';
import { BooksTable } from './BooksTable';

export const Books: FC = () => {
  return (
    <>
      <AddBookForm />
      <BooksTable />
    </>
  );
};
