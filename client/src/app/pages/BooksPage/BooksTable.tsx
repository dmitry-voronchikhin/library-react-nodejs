import React, { FC, useMemo, useState } from 'react';
import { compact } from 'lodash';
import { observer } from 'mobx-react-lite';
import { Button, Modal, Table } from 'antd';
import Skeleton from 'react-loading-skeleton';

import { Book } from '@app/graphql/types.d';
import { useGetAllBooks, useRemoveBook } from './hooks';
import { PAGE_SIZE, TABLE_COLUMNS } from './constants';

type Action = 'REMOVE';

type DataType = {
  key: string;
  name: string;
  author: string;
  publishingHouse: string;
  actions: Action[];
};

const BooksTableComponent: FC = () => {
  const [removedBookInfo, setRemovedBookInfo] = useState<{
    id: string;
    name: string;
  } | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  const { books, count, isLoading } = useGetAllBooks({ currentPage });
  const { removeBook, isLoading: rbLoading } = useRemoveBook();

  const { Column } = Table;

  const preparedBooks: Book[] = useMemo(() => compact(books), [books]);

  if (isLoading) {
    return <Skeleton height={400} />;
  }

  const dataSource: DataType[] = preparedBooks.map(
    ({ id, name, author, publishingHouse }) => ({
      key: id || '',
      name: name || '-',
      author: author || '-',
      publishingHouse: publishingHouse?.name || '-',
      actions: ['REMOVE'],
    }),
  );

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
      >
        {TABLE_COLUMNS.map((column) => {
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
      <Modal
        open={!!removedBookInfo}
        onCancel={() => setRemovedBookInfo(null)}
        onOk={() => {
          removedBookInfo && removeBook(removedBookInfo.id);
          setRemovedBookInfo(null);
        }}
      >
        <p>
          Вы действительно хотите удалить книгу
          {' ' + removedBookInfo?.name}?
        </p>
      </Modal>
    </>
  );
};

export const BooksTable = observer(BooksTableComponent);
