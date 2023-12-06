import { Button, Collapse, Form, Input, Select } from 'antd';
import React, { FC, useMemo } from 'react';

import { Option as OptionType } from '@app/types';
import { EMPTY_STRING } from '@app/constants';
import { useGetAllPublishingHouses } from '../PublishingHousePage/hooks';
import { useAddBook } from './hooks';
import { BookForm } from './types';

import styles from './styles.module.scss';

export const AddBookForm: FC = () => {
  const [form] = Form.useForm<BookForm>();

  const {
    publishingHouses,
    isLoading: phLoading,
    error: phError,
  } = useGetAllPublishingHouses();

  const { addBook, isLoading: abLoading } = useAddBook(() =>
    form.resetFields(),
  );

  const publishingHouseOptions: OptionType[] = useMemo(() => {
    return (
      publishingHouses
        ?.filter((item) => !!(item?.id && item.name))
        .map((item) => {
          return {
            label: item?.name || EMPTY_STRING,
            value: item?.id || EMPTY_STRING,
          };
        }) || []
    );
  }, [publishingHouses]);

  return (
    <Collapse bordered={false} className={styles.AddBookCard}>
      <Collapse.Panel key="addBook" header="Добавить книгу">
        <Form form={form} name="basic" onFinish={addBook}>
          <div className={styles.FormItemsContainer}>
            <Form.Item
              className={styles.FormItem}
              name="bookName"
              rules={[
                {
                  required: true,
                  message: 'Введите название книги',
                },
              ]}
            >
              <Input placeholder="Название книги" type="text" size="large" />
            </Form.Item>
            <Form.Item
              className={styles.FormItem}
              name="authorName"
              rules={[
                {
                  required: true,
                  message: 'Введите автора',
                },
              ]}
            >
              <Input placeholder="Автор" type="text" size="large" />
            </Form.Item>
            <Form.Item
              className={styles.FormItem}
              name="publishingHouse"
              rules={[
                {
                  required: true,
                  message: 'Выберите издательство',
                },
              ]}
            >
              <Select
                size="large"
                placeholder={
                  phError
                    ? 'Произошла ошибка при загрузке списка издательств'
                    : 'Издательство'
                }
                options={publishingHouseOptions}
                disabled={!!phError}
                loading={phLoading}
                status={phError ? 'error' : undefined}
                className={styles.PublishingHouseSelect}
              />
            </Form.Item>

            <Form.Item className={styles.FormItem}>
              <Button
                type="primary"
                htmlType="submit"
                size="large"
                loading={abLoading}
                disabled={abLoading || phLoading}
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
