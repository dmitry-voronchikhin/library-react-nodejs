import React, { FC } from 'react';
import { Button, Collapse, Form, Input } from 'antd';

import { useAddReader } from './hooks/useAddReader';
import { ReaderForm } from './types';

import styles from './styles.module.scss';

export const AddReaderForm: FC = () => {
  const [form] = Form.useForm<ReaderForm>();

  const { addReader, isLoading: arLoading } = useAddReader(form.resetFields);

  return (
    <Collapse
      bordered={false}
      className={styles.AddBookCard}
      items={[
        {
          id: 'addReader',
          label: 'Добавить читателя',
          children: (
            <Form form={form} name="basic" onFinish={addReader}>
              <div className={styles.FormItemsContainer}>
                <Form.Item
                  className={styles.FormItem}
                  name="name"
                  rules={[
                    {
                      required: true,
                      message: 'Введите ФИО читателя',
                    },
                  ]}
                >
                  <Input placeholder="ФИО" type="text" size="large" />
                </Form.Item>
                <Form.Item
                  className={styles.FormItem}
                  name="birthDate"
                  rules={[
                    {
                      required: true,
                      message: 'Введите дату рождения',
                    },
                  ]}
                >
                  <Input placeholder="Дата рождения" type="text" size="large" />
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
                <Form.Item
                  className={styles.FormItem}
                  name="phoneNumber"
                  rules={[
                    {
                      required: true,
                      message: 'Введите номер телефона',
                    },
                  ]}
                >
                  <Input
                    placeholder="Номер телефона"
                    type="text"
                    size="large"
                  />
                </Form.Item>
                <Form.Item className={styles.FormItem}>
                  <Button
                    type="primary"
                    htmlType="submit"
                    size="large"
                    loading={arLoading}
                    disabled={arLoading}
                  >
                    Добавить
                  </Button>
                </Form.Item>
              </div>
            </Form>
          ),
        },
      ]}
    />
  );
};
