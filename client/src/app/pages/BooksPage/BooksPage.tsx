import React, { FC } from 'react';

import { BooksTable } from './BooksTable';
import { AddBookForm } from './AddBookForm';
import { Card } from 'antd';

import styles from './styles.module.scss';

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
