import React, { FC, useMemo, useState } from 'react';
import { compact } from 'lodash';
import { observer } from 'mobx-react-lite';
import { Button, Table } from 'antd';
import { CloseOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

import { Book, BooksTypeEnum } from '@app/graphql/types.d';
import { ErrorResult } from '@app/components/ErrorResult';
import { useGetAllBooks } from './hooks';
import { PAGE_SIZE, TABLE_COLUMNS } from './constants';
import { BookInfo } from './types';

type Props = {
  type: BooksTypeEnum;
  setBookInfo: React.Dispatch<React.SetStateAction<BookInfo | null>>;
};

export const BooksTable: FC<Props> = observer(({ type, setBookInfo }) => {
  const [currentPage, setCurrentPage] = useState(1);

  const { books, count, isLoading, error, refetch } = useGetAllBooks({
    pageSize: PAGE_SIZE,
    currentPage,
    type,
  });

  const navigate = useNavigate();

  const preparedBooks: Book[] = useMemo(
    () => compact(books).map((book) => ({ ...book, key: book.id })),
    [books],
  );

  if (error) {
    return (
      <ErrorResult
        onPrimaryButtonClick={refetch}
        onSecondaryButtonClick={() => navigate('/')}
      />
    );
  }

  return (
    <Table
      dataSource={preparedBooks}
      pagination={{
        hideOnSinglePage: true,
        current: currentPage,
        pageSize: PAGE_SIZE,
        total: count,
        onChange: (page) => {
          setCurrentPage(page);
        },
      }}
      scroll={{ y: 450 }}
      loading={isLoading}
    >
      {TABLE_COLUMNS.map((column) => {
        return (
          <Table.Column
            key={column.key}
            title={column.title}
            dataIndex={column.dataIndex}
            width={72}
            render={(value: string, record: Book) =>
              column.key === 'actions' ? (
                <Button
                  key="removeBookAction"
                  type="text"
                  onClick={(): void =>
                    setBookInfo({
                      book: record,
                      action: 'REMOVE',
                    })
                  }
                >
                  <CloseOutlined />
                </Button>
              ) : (
                value
              )
            }
          />
        );
      })}
    </Table>
  );
});
