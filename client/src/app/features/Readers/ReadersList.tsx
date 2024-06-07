import React, { FC, useMemo, useState } from 'react';
import { compact } from 'lodash';
import { observer } from 'mobx-react-lite';
import { Avatar, Button, List, Modal, Tooltip } from 'antd';
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
import { EMPTY_STRING } from '@app/constants';
import { EditReaderModal } from './EditReaderModal';
import { ReaderBooks } from './ReaderBooks';
import { IssueBookModal } from './IssueBookModal';
import { useGetAllReaders, useRemoveReader } from './hooks';
import { PAGE_SIZE } from './constants';
import { Action } from './types';

import styles from './styles.module.scss';

export const ReadersList: FC = observer(() => {
  const [readerInfo, setReaderInfo] = useState<{
    reader: Reader;
    action: Action;
  } | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  const { readers, count, isLoading, error, refetch } = useGetAllReaders({
    currentPage,
  });
  const { removeReader, isLoading: rrLoading } = useRemoveReader();

  const navigate = useNavigate();

  const preparedReaders: Reader[] = useMemo(() => compact(readers), [readers]);

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
      <div className={styles.ReadersListWrapper}>
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
                    disabled={rrLoading}
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
                    disabled={rrLoading}
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
                    disabled={rrLoading}
                  >
                    <EditOutlined />
                  </Button>
                </Tooltip>,
                <Tooltip key="removeReader" title="Удалить читателя">
                  <Button
                    type="default"
                    onClick={(): void => {
                      setReaderInfo({ reader: item, action: 'EDIT' });
                    }}
                    disabled={rrLoading}
                  >
                    <CloseOutlined />
                  </Button>
                </Tooltip>,
              ]}
              extra={
                readerInfo?.reader.id === item.id &&
                readerInfo?.action === 'BOOKS' && (
                  <RightOutlined style={{ position: 'absolute', right: -51 }} />
                )
              }
            >
              <List.Item.Meta
                avatar={
                  <Avatar
                    src={`https://api.multiavatar.com/${item.name}.svg`}
                  />
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
        {readerInfo?.action === 'BOOKS' && (
          <ReaderBooks readerId={readerInfo?.reader.id || EMPTY_STRING} />
        )}
      </div>
      <Modal
        open={readerInfo?.action === 'REMOVE'}
        okText="ОК"
        cancelText="Отменить"
        closable={false}
        onCancel={() => setReaderInfo(null)}
        onOk={() => {
          readerInfo?.reader &&
            removeReader(readerInfo?.reader.id || EMPTY_STRING);
          setReaderInfo(null);
        }}
      >
        <span>
          {`Вы действительно хотите удалить читателя ${
            readerInfo?.reader.name || EMPTY_STRING
          }?`}
        </span>
      </Modal>
      {readerInfo?.action === 'EDIT' && (
        <EditReaderModal
          isOpen
          onClose={() => setReaderInfo(null)}
          reader={readerInfo.reader || {}}
        />
      )}
      {readerInfo?.action === 'ISSUE_BOOK' && (
        <IssueBookModal
          readerId={readerInfo.reader.id || EMPTY_STRING}
          onCancel={() => setReaderInfo(null)}
        />
      )}
    </>
  );
});
