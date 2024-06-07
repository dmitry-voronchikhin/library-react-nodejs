import React, { FC } from 'react';
import { Button, List, Tooltip } from 'antd';
import { RollbackOutlined } from '@ant-design/icons';

import { ErrorResult } from '@app/components/ErrorResult';
import { useGetBooksByReader } from './hooks';

import styles from './styles.module.scss';

type Props = {
  readerId: string;
};

export const ReaderBooks: FC<Props> = ({ readerId }) => {
  const { books, isLoading, error, refetch } = useGetBooksByReader({
    readerId,
  });

  if (error) {
    return <ErrorResult onPrimaryButtonClick={refetch} />;
  }

  return (
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
              <Button key="returnBook" type="default">
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
                {item?.publishingHouse}
              </>
            }
          />
        </List.Item>
      )}
    />
  );
};
