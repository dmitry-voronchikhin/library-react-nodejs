import React, { FC, useMemo, useState } from 'react';
import { compact } from 'lodash';
import { observer } from 'mobx-react-lite';
import { Button, Modal, Table } from 'antd';
import Skeleton from 'react-loading-skeleton';

import { PublishingHouse } from '@app/graphql/types.d';
import { EMPTY_STRING } from '@app/constants';
import { TABLE_COLUMNS } from './constants';
import { useGetAllPublishingHouses, useRemovePublishingHouse } from './hooks';

type Action = 'REMOVE';

type DataType = {
  key: string;
  name: string;
  address: string;
  actions: Action[];
};

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
      <Table dataSource={dataSource}>
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
        open={!!removedPHInfo}
        onCancel={() => setRemovedPHInfo(null)}
        onOk={() => {
          removedPHInfo && removePublishingHouse(removedPHInfo.id);
          setRemovedPHInfo(null);
        }}
      >
        <p>
          {`Вы действительно хотите удалить издательство ${
            removedPHInfo?.name || EMPTY_STRING
          }?`}
        </p>
      </Modal>
    </>
  );
});
