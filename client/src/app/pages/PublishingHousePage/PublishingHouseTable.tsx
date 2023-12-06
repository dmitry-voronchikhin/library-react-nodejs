import React, { FC, useState } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { compact } from 'lodash';
import { observer } from 'mobx-react-lite';
import { Button, Modal, Table } from 'antd';
import Skeleton from 'react-loading-skeleton';

import {
  GetAllPublishingHousesQuery,
  GetAllPublishingHousesQueryVariables,
  PublishingHouse,
  RemovePublishingHouseMutation,
  RemovePublishingHouseMutationVariables,
  ResultStatusEnum,
} from '@app/graphql/types.d';
import { GET_ALL_PUBLISHING_HOUSES } from '@app/graphql/queries';
import { REMOVE_PUBLISHING_HOUSE } from '@app/graphql/mutations';
import { openNotification } from '@app/utils';
import { EMPTY_STRING, WARNING_TITLE } from '@app/constants';

type Action = 'REMOVE';

type DataType = {
  key: string;
  name: string;
  address: string;
  actions: Action[];
};

const PublishingHouseTableComponent: FC = () => {
  const [removedPHInfo, setRemovedPHInfo] = useState<{
    id: string;
    name: string;
  } | null>(null);

  const { data, loading } = useQuery<
    GetAllPublishingHousesQuery,
    GetAllPublishingHousesQueryVariables
  >(GET_ALL_PUBLISHING_HOUSES, {
    fetchPolicy: 'cache-first',
  });

  const [removePublishingHouseRequest, { loading: rphLoading }] = useMutation<
    RemovePublishingHouseMutation,
    RemovePublishingHouseMutationVariables
  >(REMOVE_PUBLISHING_HOUSE);

  const removePublishingHouse = (id: string) => {
    removePublishingHouseRequest({
      variables: {
        id,
      },
      refetchQueries: ['getAllPublishingHouses'],
      onCompleted: (data) => {
        if (
          data.removePublishingHouse?.result?.status === ResultStatusEnum.Ok
        ) {
          openNotification(
            EMPTY_STRING,
            `Издательство ${
              data.removePublishingHouse?.publishingHouse?.name || EMPTY_STRING
            } успешно удалено`,
            'success',
          );
          return;
        }

        throw new Error();
      },
      onError: () => {
        openNotification(
          WARNING_TITLE,
          'Произошла ошибка при удалении издательства',
          'error',
        );
      },
    });
  };

  if (loading) {
    return <Skeleton height={400} />;
  }

  const publishingHouses: PublishingHouse[] = compact(
    data?.getAllPublishingHouses?.publishingHouses,
  );

  const columns = [
    {
      title: 'Наименование',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Адрес',
      dataIndex: 'address',
      key: 'address',
    },
    {
      title: EMPTY_STRING,
      dataIndex: 'actions',
      key: 'actions',
    },
  ];

  const dataSource: DataType[] = publishingHouses.map(
    ({ id, name, address }) => ({
      key: id || EMPTY_STRING,
      name: name || '-',
      address: address || '-',
      actions: ['REMOVE'],
    }),
  );

  const { Column } = Table;

  return (
    <>
      <Table dataSource={dataSource}>
        {columns.map((column) => {
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
                        type="ghost"
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
          Вы действительно хотите удалить издательство
          {' ' + removedPHInfo?.name}?
        </p>
      </Modal>
    </>
  );
};

export const PublishingHouseTable = observer(PublishingHouseTableComponent);
