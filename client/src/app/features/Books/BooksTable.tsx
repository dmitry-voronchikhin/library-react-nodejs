import React, { FC, useMemo, useState } from 'react';
import { compact } from 'lodash';
import { observer } from 'mobx-react-lite';
import { Button, Modal, Table } from 'antd';
import Skeleton from 'react-loading-skeleton';
import { useNavigate } from 'react-router-dom';

import { Book } from '@app/graphql/types.d';
import { ErrorResult } from '@app/components/ErrorResult';
import { EMPTY_STRING } from '@app/constants';
import { useGetAllBooks, useRemoveBook } from './hooks';
import { PAGE_SIZE, TABLE_COLUMNS } from './constants';
import { DataType } from './types';

export const BooksTable: FC = observer(() => {
  const [removedBookInfo, setRemovedBookInfo] = useState<{
    id: string;
    name: string;
  } | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  const { books, count, isLoading, error, refetch } = useGetAllBooks({
    currentPage,
  });
  const { removeBook, isLoading: rbLoading } = useRemoveBook();

  const navigate = useNavigate();

  const { Column } = Table;

  const preparedBooks: Book[] = useMemo(() => compact(books), [books]);

  const dataSource: DataType[] = useMemo(
    () =>
      preparedBooks.map(({ id, name, author, publishingHouse }) => ({
        key: id || '',
        name: name || '-',
        author: author || '-',
        publishingHouse: publishingHouse?.name || '-',
        actions: ['REMOVE'],
      })),
    [preparedBooks],
  );

  if (isLoading) {
    return <Skeleton height={400} />;
  }

  if (error) {
    return (
      <ErrorResult
        onPrimaryButtonClick={refetch}
        onSecondaryButtonClick={() => navigate('/')}
      />
    );
  }

  return (
    <>
      <Table
        dataSource={dataSource}
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
      >
        {TABLE_COLUMNS.map((column) => {
          // if (column.key === 'actions') {
          return (
            <Column
              key={column.key}
              title={column.title}
              dataIndex={column.dataIndex}
              width={72}
              {...(column.key === 'actions'
                ? {
                    render: (actions: string[], record: DataType) => (
                      <>
                        {actions.includes('REMOVE') && (
                          <Button
                            type="text"
                            onClick={(): void =>
                              setRemovedBookInfo({
                                id: record.key,
                                name: record.name,
                              })
                            }
                            disabled={rbLoading}
                          >
                            X
                          </Button>
                        )}
                      </>
                    ),
                  }
                : {})}
            />
          );
        })}
      </Table>
      <Modal
        open={!!removedBookInfo}
        okText="ОК"
        cancelText="Отменить"
        closable={false}
        onCancel={() => setRemovedBookInfo(null)}
        onOk={() => {
          removedBookInfo && removeBook(removedBookInfo.id);
          setRemovedBookInfo(null);
        }}
      >
        <span>
          {`Вы действительно хотите удалить книгу ${
            removedBookInfo?.name || EMPTY_STRING
          }?`}
        </span>
      </Modal>
    </>
  );
});
