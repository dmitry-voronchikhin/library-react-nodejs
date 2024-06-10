import React, { FC, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import { Button, Modal, Table } from 'antd';
import { CloseOutlined } from '@ant-design/icons';
import compact from 'lodash/compact';

import { PublishingHouse } from '@app/graphql/types.d';
import { EMPTY_STRING } from '@app/constants';
import { ErrorResult } from '@app/components/ErrorResult';
import { TABLE_COLUMNS } from './constants';
import { useGetAllPublishingHouses, useRemovePublishingHouse } from './hooks';

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
    <>
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
                    type="text"
                    onClick={(): void => {
                      setRemovedPHInfo({
                        id: record.id || EMPTY_STRING,
                        name: record.name || EMPTY_STRING,
                      });
                    }}
                    disabled={rphLoading}
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
