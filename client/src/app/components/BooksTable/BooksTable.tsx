import React, { FC } from 'react';
import { useQuery } from '@apollo/client';
import { compact } from 'lodash';
import { observer } from 'mobx-react-lite';

import {
  Book,
  GetAllBooksQuery,
  GetAllBooksQueryVariables,
} from '@app/graphql/types';
import { GET_ALL_BOOKS } from '@app/graphql/queries';
import { Table } from 'antd';

const BooksTableComponent: FC = () => {
  const { data, loading } = useQuery<
    GetAllBooksQuery,
    GetAllBooksQueryVariables
  >(GET_ALL_BOOKS);

  if (loading) {
    return <h1>Loading...</h1>;
  }

  const books: Book[] = compact(data?.getAllBooks);

  const columns = [
    {
      title: 'Наименование',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Автор',
      dataIndex: 'author',
      key: 'author',
    },
    {
      title: 'Издательство',
      dataIndex: 'publishingHouse',
      key: 'publishingHouse',
    },
  ];

  const dataSource = books.map(({ id, name, author, publishingHouse }) => ({
    key: id,
    name,
    author,
    publishingHouse: publishingHouse?.name,
  }));

  return <Table dataSource={dataSource} columns={columns} />;
};

export const BooksTable = observer(BooksTableComponent);
