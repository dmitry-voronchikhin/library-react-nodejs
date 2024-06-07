import React, { FC, useMemo, useState } from 'react';
import { compact } from 'lodash';
import { useNavigate } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import { Button, Modal, Table } from 'antd';
import { CloseOutlined } from '@ant-design/icons';
import Skeleton from 'react-loading-skeleton';

import { PublishingHouse } from '@app/graphql/types.d';
import { EMPTY_STRING } from '@app/constants';
import { ErrorResult } from '@app/components/ErrorResult';
import { TABLE_COLUMNS } from './constants';
import { useGetAllPublishingHouses, useRemovePublishingHouse } from './hooks';
import { DataType } from './types';

export const PublishingHouseTable: FC = observer(() => {
  const [removedPHInfo, setRemovedPHInfo] = useState<{
    id: string;
    name: string;
  } | null>(null);

  const {
    publishingHouses,
    isLoading: isPHLoading,
    error: phError,
    refetch,
  } = useGetAllPublishingHouses();
  const { removePublishingHouse, isLoading: rphLoading } =
    useRemovePublishingHouse();

  const navigate = useNavigate();

  const preparedPublishingHouses: PublishingHouse[] = useMemo(
    () => compact(publishingHouses),
    [publishingHouses],
  );

  const dataSource: DataType[] = useMemo(
    () =>
      preparedPublishingHouses.map(({ id, name, address }) => ({
        key: id || EMPTY_STRING,
        name: name || '-',
        address: address || '-',
        actions: ['REMOVE'],
      })),
    [preparedPublishingHouses],
  );

  const { Column } = Table;

  if (isPHLoading) {
    return <Skeleton height={400} />;
  }

  if (phError) {
    return (
      <ErrorResult
        onPrimaryButtonClick={refetch}
        onSecondaryButtonClick={() => navigate('/')}
      />
    );
  }

  return (
    <>
      <Table dataSource={dataSource} scroll={{ y: 450 }}>
        {TABLE_COLUMNS.map((column) => (
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
                          onClick={(): void => {
                            setRemovedPHInfo({
                              id: record.key,
                              name: record.name,
                            });
                          }}
                          disabled={rphLoading}
                        >
                          <CloseOutlined />
                        </Button>
                      )}
                    </>
                  ),
                }
              : {})}
          />
        ))}
      </Table>
      <Modal
        open={!!removedPHInfo}
        okText="ОК"
        cancelText="Отменить"
        closable={false}
        onCancel={() => setRemovedPHInfo(null)}
        onOk={() => {
          removedPHInfo && removePublishingHouse(removedPHInfo.id);
          setRemovedPHInfo(null);
        }}
      >
        <span>
          {`Вы действительно хотите удалить издательство ${
            removedPHInfo?.name || EMPTY_STRING
          }?`}
        </span>
      </Modal>
    </>
  );
});
