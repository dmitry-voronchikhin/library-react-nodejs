import React, { FC, useMemo, useState } from 'react';
import { compact } from 'lodash';
import { observer } from 'mobx-react-lite';
import { Button, Modal, Table } from 'antd';
import Skeleton from 'react-loading-skeleton';

import { PublishingHouse } from '@app/graphql/types.d';
import { EMPTY_STRING } from '@app/constants';
import { TABLE_COLUMNS } from './constants';
import { useGetAllPublishingHouses, useRemovePublishingHouse } from './hooks';
import { DataType } from './types';

export const PublishingHouseTable: FC = observer(() => {
  const [removedPHInfo, setRemovedPHInfo] = useState<{
    id: string;
    name: string;
  } | null>(null);

  const { publishingHouses, isLoading: isPHLoading } =
    useGetAllPublishingHouses();
  const { removePublishingHouse, isLoading: rphLoading } =
    useRemovePublishingHouse();

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
                          X
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
