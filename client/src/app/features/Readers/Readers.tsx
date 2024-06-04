import React, { FC } from 'react';

import { AddReaderForm } from './AddReaderForm';
import { ReadersList } from './ReadersList';

export const Readers: FC = () => {
  return (
    <>
      <AddReaderForm />
      <ReadersList />
    </>
  );
};
