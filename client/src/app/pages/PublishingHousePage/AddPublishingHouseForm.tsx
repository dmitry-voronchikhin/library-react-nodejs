import { Button, Collapse, Form, Input } from 'antd';
import React, { FC } from 'react';

import { useAddPublishingHouse } from './hooks';
import { PublishingHouseForm } from './types';

import styles from './styles.module.scss';

export const AddPublishingHouseForm: FC = () => {
  const [form] = Form.useForm<PublishingHouseForm>();

  const { addPublishingHouse, isLoading: aphLoading } = useAddPublishingHouse(
    () => form.resetFields(),
  );

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
