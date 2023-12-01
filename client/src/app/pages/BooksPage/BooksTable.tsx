import React, { FC, useState } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { compact } from 'lodash';
import { observer } from 'mobx-react-lite';
import { Button, Table } from 'antd';

import {
  Book,
  GetAllBooksQuery,
  GetAllBooksQueryVariables,
  RemoveBookMutation,
  RemoveBookMutationVariables,
  ResultStatusEnum,
} from '@app/graphql/types.d';
import { GET_ALL_BOOKS } from '@app/graphql/queries';
import { EMPTY_STRING, WARNING_TITLE } from '@app/constants';
import { REMOVE_BOOK } from '@app/graphql/mutations/removeBook';
import { openNotification } from '@app/utils';
import Skeleton from 'react-loading-skeleton';

const PAGE_SIZE = 10;

type Action = 'REMOVE';

type DataType = {
  key: string;
  name: string;
  author: string;
  publishingHouse: string;
  actions: Action[];
};

const BooksTableComponent: FC = () => {
  const [currentPage, setCurrentPage] = useState(1);

  const { data, loading } = useQuery<
    GetAllBooksQuery,
    GetAllBooksQueryVariables
  >(GET_ALL_BOOKS, {
    variables: {
      page: currentPage,
      count: PAGE_SIZE,
    },
  });

  const [removeBookRequest, { loading: rbLoading }] = useMutation<
    RemoveBookMutation,
    RemoveBookMutationVariables
  >(REMOVE_BOOK);

  const removeBook = (id: string, name: string) => {
    const result = confirm(`Удалить книгу ${name} ?`);

    if (!result) {
      return;
    }

    removeBookRequest({
      variables: {
        id,
      },
      refetchQueries: ['getAllBooks'],
      onCompleted: (data) => {
        if (data.removeBook?.result?.status === ResultStatusEnum.Ok) {
          openNotification(
            EMPTY_STRING,
            `Книга ${
              data.removeBook?.book?.name || EMPTY_STRING
            } успешно удалена`,
            'success',
          );
          return;
        }

        throw new Error();
      },
      onError: () => {
        openNotification(
          WARNING_TITLE,
          'Произошла ошибка при удалении книги',
          'error',
        );
      },
    });
  };

  if (loading) {
    return <Skeleton height={400} />;
  }

  const { Column } = Table;

  const books: Book[] = compact(data?.getAllBooks?.books);

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
    {
      title: EMPTY_STRING,
      dataIndex: 'actions',
      key: 'actions',
    },
  ];

  const dataSource: DataType[] = books.map(
    ({ id, name, author, publishingHouse }) => ({
      key: id || '',
      name: name || '-',
      author: author || '-',
      publishingHouse: publishingHouse?.name || '-',
      actions: ['REMOVE'],
    }),
  );

  return (
    <Table
      dataSource={dataSource}
      pagination={{
        hideOnSinglePage: true,
        current: currentPage,
        pageSize: PAGE_SIZE,
        total: data?.getAllBooks?.count || 0,
        onChange: (page) => {
          setCurrentPage(page);
        },
      }}
    >
      {columns.map((column) => {
        if (column.key === 'actions') {
          return (
            <Column
              key={column.key}
              title={column.title}
              dataIndex={column.dataIndex}
              width={72}
              render={(actions: string[], record: DataType) => (
                <>
                  {actions.includes('REMOVE') && (
                    <Button
                      type="ghost"
                      onClick={(): void => removeBook(record.key, record.name)}
                      disabled={rbLoading}
                    >
                      X
                    </Button>
                  )}
                </>
              )}
            />
          );
        }

        return (
          <Column
            key={column.key}
            title={column.title}
            dataIndex={column.dataIndex}
          />
        );
      })}
    </Table>
  );
};

export const BooksTable = observer(BooksTableComponent);
