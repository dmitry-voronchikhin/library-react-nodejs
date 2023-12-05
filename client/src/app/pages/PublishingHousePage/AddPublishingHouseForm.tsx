import { Button, Collapse, Form, Input } from 'antd';
import { useMutation } from '@apollo/client';
import React, { FC } from 'react';

import {
  AddPublishingHouseMutation,
  AddPublishingHouseMutationVariables,
  ResultStatusEnum,
} from '@app/graphql/types.d';
import { ADD_PUBLISHING_HOUSE } from '@app/graphql/mutations';
import { EMPTY_STRING, WARNING_TITLE } from '@app/constants';
import { openNotification } from '@app/utils';

import styles from './styles.module.scss';

type PublishingHouseForm = {
  name: string | undefined;
  address: string | undefined;
};

export const AddPublishingHouseForm: FC = () => {
  const [form] = Form.useForm<PublishingHouseForm>();

  const [addPublishingHouseRequest, { loading: aphLoading }] = useMutation<
    AddPublishingHouseMutation,
    AddPublishingHouseMutationVariables
  >(ADD_PUBLISHING_HOUSE);

  const addPublishingHouse = (values: PublishingHouseForm) => {
    addPublishingHouseRequest({
      variables: {
        name: values.name || EMPTY_STRING,
        address: values.address || EMPTY_STRING,
      },
      refetchQueries: ['getAllPublishingHouses'],
      onCompleted: (data) => {
        if (data.addPublishingHouse?.result?.status === ResultStatusEnum.Ok) {
          form.resetFields();
          openNotification(
            EMPTY_STRING,
            `Издательство ${
              data.addPublishingHouse?.publishingHouse?.name || EMPTY_STRING
            } успешно добавлено`,
            'success',
          );
          return;
        }

        throw new Error();
      },
      onError: () => {
        openNotification(
          WARNING_TITLE,
          'Произошла ошибка при добавлении издательства',
          'error',
        );
      },
    });
  };

  return (
    <Collapse bordered={false} className={styles.PublishingHouseCard}>
      <Collapse.Panel key="addPublishingHouse" header="Добавить издательство">
        <Form form={form} name="basic" onFinish={addPublishingHouse}>
          <div className={styles.FormItemsContainer}>
            <Form.Item
              className={styles.FormItem}
              name="name"
              rules={[
                {
                  required: true,
                  message: 'Введите название издательства',
                },
              ]}
            >
              <Input
                placeholder="Название издательства"
                type="text"
                size="large"
              />
            </Form.Item>
            <Form.Item
              className={styles.FormItem}
              name="address"
              rules={[
                {
                  required: true,
                  message: 'Введите адрес',
                },
              ]}
            >
              <Input placeholder="Адрес" type="text" size="large" />
            </Form.Item>

            <Form.Item className={styles.FormItem}>
              <Button
                type="primary"
                htmlType="submit"
                size="large"
                loading={aphLoading}
                disabled={aphLoading}
              >
                Добавить
              </Button>
            </Form.Item>
          </div>
        </Form>
      </Collapse.Panel>
    </Collapse>
  );
};
