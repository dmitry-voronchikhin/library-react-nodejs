import React, { FC, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import { Button, Table } from 'antd';
import { CloseOutlined } from '@ant-design/icons';
import compact from 'lodash/compact';

import { PublishingHouse } from '@app/graphql/types.d';
import { ErrorResult } from '@app/components/ErrorResult';
import { TABLE_COLUMNS } from './constants';
import { useGetAllPublishingHouses } from './hooks';
import { Action } from './types';

type Props = {
  setPhInfo: React.Dispatch<
    React.SetStateAction<{
      publishingHouse: PublishingHouse;
      action: Action;
    } | null>
  >;
};

export const PublishingHouseTable: FC<Props> = observer(({ setPhInfo }) => {
  const {
    publishingHouses,
    isLoading: isPHLoading,
    error: phError,
    refetch,
  } = useGetAllPublishingHouses();

  const navigate = useNavigate();

  const preparedPublishingHouses: PublishingHouse[] = useMemo(
    () => compact(publishingHouses).map((ph) => ({ ...ph, key: ph.id })),
    [publishingHouses],
  );

  const { Column } = Table;

  if (phError) {
    return (
      <ErrorResult
        onPrimaryButtonClick={refetch}
        onSecondaryButtonClick={() => navigate('/')}
      />
    );
  }

  return (
    <Table
      dataSource={preparedPublishingHouses}
      scroll={{ y: 450 }}
      loading={isPHLoading}
    >
      {TABLE_COLUMNS.map((column) => (
        <Column
          key={column.key}
          title={column.title}
          dataIndex={column.dataIndex}
          width={72}
          render={(value: string, record: PublishingHouse) => {
            return column.key === 'actions' ? (
              <>
                <Button
                  key="removePHAction"
                  type="text"
                  onClick={(): void => {
                    setPhInfo({ publishingHouse: record, action: 'REMOVE' });
                  }}
                >
                  <CloseOutlined />
                </Button>
              </>
            ) : (
              value
            );
          }}
        />
      ))}
    </Table>
  );
});
