import React, { FC, useState } from 'react';
import { Button, List, Tooltip } from 'antd';
import { RollbackOutlined } from '@ant-design/icons';

import { Book } from '@app/graphql/types';
import { ErrorResult } from '@app/components/ErrorResult';
import { ReturnBookModal } from './ReturnBookModal';
import { useGetBooksByReader } from './hooks';
import { BookAction } from './types';

import styles from './styles.module.scss';

type Props = {
  readerId: string;
};

export const ReaderBooks: FC<Props> = ({ readerId }) => {
  const [returnBookInfo, setReturnBookInfo] = useState<{
    book: Book | null;
    action: BookAction;
  } | null>(null);

  const { books, isLoading, error, refetch } = useGetBooksByReader({
    readerId,
  });

  if (error) {
    return <ErrorResult onPrimaryButtonClick={refetch} />;
  }

  return (
    <>
      <List
        className={styles.List}
        loading={isLoading}
        itemLayout="horizontal"
        dataSource={books}
        renderItem={(item) => (
          <List.Item
            key={item?.id}
            className={styles.ListItem}
            actions={[
              <Tooltip key="returnBook" title="Вернуть книгу">
                <Button
                  type="default"
                  onClick={() =>
                    setReturnBookInfo({
                      book: item,
                      action: 'RETURN_BOOK',
                    })
                  }
                >
                  <RollbackOutlined />
                </Button>
              </Tooltip>,
            ]}
          >
            <List.Item.Meta
              title={item?.name}
              description={
                <>
                  Автор: {item?.author} <br />
                  {item?.publishingHouse?.name},{' '}
                  {item?.publishingHouse?.address}
                </>
              }
            />
          </List.Item>
        )}
      />
      {returnBookInfo?.book && returnBookInfo?.action === 'RETURN_BOOK' && (
        <ReturnBookModal
          book={returnBookInfo.book}
          onClose={() => setReturnBookInfo(null)}
        />
      )}
    </>
  );
};
