import React, { FC, useMemo, useState } from 'react';
import { compact } from 'lodash';
import { observer } from 'mobx-react-lite';
import { Avatar, Button, List, Tooltip } from 'antd';
import {
  CloseOutlined,
  EditOutlined,
  FileAddOutlined,
  ReadOutlined,
  RightOutlined,
} from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

import { Reader } from '@app/graphql/types.d';
import { ErrorResult } from '@app/components/ErrorResult';
import { useGetAllReaders } from './hooks';
import { PAGE_SIZE } from './constants';
import { Action } from './types';

import styles from './styles.module.scss';

type Props = {
  readerInfo: {
    reader: Reader | null;
    action: Action;
  } | null;
  setReaderInfo: React.Dispatch<
    React.SetStateAction<{
      reader: Reader | null;
      action: Action;
    } | null>
  >;
};

export const ReadersList: FC<Props> = observer(
  ({ readerInfo, setReaderInfo }) => {
    const [currentPage, setCurrentPage] = useState(1);

    const { readers, count, isLoading, error, refetch } = useGetAllReaders({
      currentPage,
    });

    const navigate = useNavigate();

    const preparedReaders: Reader[] = useMemo(
      () => compact(readers),
      [readers],
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
      <List
        className={styles.List}
        loading={isLoading}
        itemLayout="horizontal"
        pagination={{
          pageSize: PAGE_SIZE,
          current: currentPage,
          hideOnSinglePage: true,
          total: count,
          onChange: (page) => {
            setCurrentPage(page);
          },
        }}
        dataSource={preparedReaders}
        renderItem={(item) => (
          <List.Item
            key={item.id}
            className={styles.ListItem}
            actions={[
              <Tooltip key="issueBook" title="Выдать книгу">
                <Button
                  type="default"
                  onClick={() => {
                    setReaderInfo({ reader: item, action: 'ISSUE_BOOK' });
                  }}
                >
                  <FileAddOutlined />
                </Button>
              </Tooltip>,
              <Tooltip key="booksList" title="Список выданных книг">
                <Button
                  type="default"
                  onClick={() => {
                    setReaderInfo({ reader: item, action: 'BOOKS' });
                  }}
                >
                  <ReadOutlined style={{ width: 15 }} />
                </Button>
              </Tooltip>,
              <Tooltip key="editReader" title="Редактировать данные читателя">
                <Button
                  type="default"
                  onClick={() => {
                    setReaderInfo({ reader: item, action: 'EDIT' });
                  }}
                >
                  <EditOutlined />
                </Button>
              </Tooltip>,
              <Tooltip key="removeReader" title="Удалить читателя">
                <Button
                  type="default"
                  onClick={(): void => {
                    setReaderInfo({ reader: item, action: 'REMOVE' });
                  }}
                >
                  <CloseOutlined />
                </Button>
              </Tooltip>,
            ]}
            extra={
              readerInfo?.reader?.id === item.id &&
              readerInfo?.action === 'BOOKS' && (
                <RightOutlined style={{ position: 'absolute', right: -51 }} />
              )
            }
          >
            <List.Item.Meta
              avatar={
                <Avatar src={`https://api.multiavatar.com/${item.name}.svg`} />
              }
              title={item.name}
              description={
                <>
                  Дата рождения: {item.birthDate} <br />
                  Тел. {item.phoneNumber}
                  <br />
                  Адрес: {item.address}
                </>
              }
            />
          </List.Item>
        )}
      />
    );
  },
);
