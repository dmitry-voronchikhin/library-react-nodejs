import React, { FC, useMemo, useState } from 'react';
import { compact } from 'lodash';
import { observer } from 'mobx-react-lite';
import { Button, Modal, Radio, Table } from 'antd';
import { CloseOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

import { Book, BooksTypeEnum } from '@app/graphql/types.d';
import { ErrorResult } from '@app/components/ErrorResult';
import { EMPTY_STRING } from '@app/constants';
import { useGetAllBooks, useRemoveBook } from './hooks';
import { PAGE_SIZE, TABLE_COLUMNS } from './constants';

import styles from './styles.module.scss';

export const BooksTable: FC = observer(() => {
  const [removedBookInfo, setRemovedBookInfo] = useState<{
    id: string;
    name: string;
  } | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [type, setType] = useState<BooksTypeEnum>(BooksTypeEnum.All);

  const { books, count, isLoading, error, refetch } = useGetAllBooks({
    pageSize: PAGE_SIZE,
    currentPage,
    type,
  });
  const { removeBook, isLoading: rbLoading } = useRemoveBook();

  const navigate = useNavigate();

  const { Column } = Table;

  const preparedBooks: Book[] = useMemo(() => compact(books), [books]);

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
      <div className={styles.FiltersContainer}>
        <Radio.Group
          buttonStyle="solid"
          defaultValue={BooksTypeEnum.All}
          onChange={(e) => setType(e.target.value)}
        >
          <Radio.Button value={BooksTypeEnum.All}>Все</Radio.Button>
          <Radio.Button value={BooksTypeEnum.Issued}>Выданные</Radio.Button>
          <Radio.Button value={BooksTypeEnum.NotIssued}>Остаток</Radio.Button>
        </Radio.Group>
      </div>
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
            <Column
              key={column.key}
              title={column.title}
              dataIndex={column.dataIndex}
              width={72}
              render={(value: string[], record: Book) =>
                column.key === 'actions' ? (
                  <Button
                    type="text"
                    onClick={(): void =>
                      setRemovedBookInfo({
                        id: record.id || EMPTY_STRING,
                        name: record.name || EMPTY_STRING,
                      })
                    }
                    disabled={rbLoading}
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
