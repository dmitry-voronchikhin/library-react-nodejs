import React, { FC, useState } from 'react';

import { BooksTypeEnum } from '@app/graphql/types.d';
import { AddBookForm } from './AddBookForm';
import { BooksTable } from './BooksTable';
import { BooksFilter } from './BooksFilter';
import { RemoveBookModal } from './RemoveBookModal';
import { BookInfo } from './types';

export const Books: FC = () => {
  const [bookInfo, setBookInfo] = useState<BookInfo | null>(null);
  const [type, setType] = useState<BooksTypeEnum>(BooksTypeEnum.All);

  return (
    <>
      <AddBookForm />
      <BooksFilter setType={setType} />
      <BooksTable type={type} setBookInfo={setBookInfo} />
      {bookInfo?.action === 'REMOVE' && (
        <RemoveBookModal
          book={bookInfo?.book || {}}
          onCancel={() => setBookInfo(null)}
        />
      )}
    </>
  );
};
