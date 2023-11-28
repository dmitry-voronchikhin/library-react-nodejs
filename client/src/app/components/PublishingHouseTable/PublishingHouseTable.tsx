import React, { FC } from 'react';
import { useQuery } from '@apollo/client';
import { compact } from 'lodash';
import { observer } from 'mobx-react-lite';

import {
  GetAllPublishingHousesQuery,
  GetAllPublishingHousesQueryVariables,
  PublishingHouse,
} from '@app/graphql/types';
import { GET_ALL_PUBLISHING_HOUSES } from '@app/graphql/queries';
import { Table } from 'antd';

const PublishingHouseTableComponent: FC = () => {
  const { data, loading } = useQuery<
    GetAllPublishingHousesQuery,
    GetAllPublishingHousesQueryVariables
  >(GET_ALL_PUBLISHING_HOUSES);

  if (loading) {
    return <h1>Loading...</h1>;
  }

  const publishingHouses: PublishingHouse[] = compact(
    data?.getAllPublishingHouses,
  );

  const columns = [
    {
      title: 'Наименование',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Адрес',
      dataIndex: 'author',
      key: 'author',
    },
  ];

  const dataSource = publishingHouses.map(({ id, name, address }) => ({
    key: id,
    name,
    address,
  }));

  return <Table dataSource={dataSource} columns={columns} />;
};

export const PublishingHouseTable = observer(PublishingHouseTableComponent);
