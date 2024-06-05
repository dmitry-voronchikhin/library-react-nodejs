import React, { FC, useMemo, useState } from 'react';
import { compact } from 'lodash';
import { observer } from 'mobx-react-lite';
import { Avatar, Button, List, Modal } from 'antd';
import { useNavigate } from 'react-router-dom';

import { Reader } from '@app/graphql/types.d';
import { ErrorResult } from '@app/components/ErrorResult';
import { EMPTY_STRING } from '@app/constants';
import { EditReaderModal } from './EditReaderModal';
import { useGetAllReaders, useRemoveReader } from './hooks';
import { PAGE_SIZE } from './constants';
import { DataType } from './types';

import styles from './styles.module.scss';

export const ReadersList: FC = observer(() => {
  const [removedReaderInfo, setRemovedReaderInfo] = useState<{
    id: string;
    name: string;
  } | null>(null);
  const [readerInfo, setReaderInfo] = useState<Reader | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  const { readers, count, isLoading, error, refetch } = useGetAllReaders({
    currentPage,
  });
  const { removeReader, isLoading: rrLoading } = useRemoveReader();

  const navigate = useNavigate();

  const preparedReaders: Reader[] = useMemo(() => compact(readers), [readers]);

  const list: DataType[] = useMemo(
    () =>
      preparedReaders.map(({ id, name, address, birthDate, phoneNumber }) => ({
        id: id || '',
        name: name || '-',
        address: address || '-',
        birthDate: birthDate || '-',
        phoneNumber: phoneNumber || '-',
        actions: ['REMOVE', 'EDIT'],
      })),
    [preparedReaders],
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
    <>
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
        dataSource={list}
        renderItem={(item) => (
          <List.Item
            key={item.id}
            actions={[
              item.actions.includes('EDIT') && (
                <Button
                  type="default"
                  onClick={() => {
                    setReaderInfo(item);
                  }}
                  disabled={rrLoading}
                >
                  Редактировать
                </Button>
              ),
              item.actions.includes('REMOVE') && (
                <Button
                  type="default"
                  onClick={(): void =>
                    setRemovedReaderInfo({
                      id: item.id,
                      name: item.name,
                    })
                  }
                  disabled={rrLoading}
                >
                  Удалить
                </Button>
              ),
            ]}
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
      <Modal
        open={!!removedReaderInfo}
        okText="ОК"
        cancelText="Отменить"
        onCancel={() => setRemovedReaderInfo(null)}
        onOk={() => {
          removedReaderInfo && removeReader(removedReaderInfo.id);
          setRemovedReaderInfo(null);
        }}
      >
        <span>
          {`Вы действительно хотите удалить читателя ${
            removedReaderInfo?.name || EMPTY_STRING
          }?`}
        </span>
      </Modal>
      <EditReaderModal
        isOpen={!!readerInfo}
        onClose={() => setReaderInfo(null)}
        reader={readerInfo || {}}
      />
    </>
  );
});
