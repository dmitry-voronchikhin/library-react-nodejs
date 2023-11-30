import React, { FC } from 'react';

import { BooksTable } from './BooksTable';
import { Card } from 'antd';

import styles from './styles.module.scss';
import { AddBookForm } from './AddBookForm';

export const BooksPage: FC = () => {
  return (
    <div>
      <Card className={styles.AddBookCard}>
        <AddBookForm />
      </Card>
      <BooksTable />
    </div>
  );
};
