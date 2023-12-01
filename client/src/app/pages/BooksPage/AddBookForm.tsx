import { Button, Collapse, Form, Input, Select } from 'antd';
import { useMutation, useQuery } from '@apollo/client';
import React, { FC, useMemo } from 'react';

import {
  AddBookMutation,
  AddBookMutationVariables,
  GetAllPublishingHousesQuery,
  GetAllPublishingHousesQueryVariables,
  ResultStatusEnum,
} from '@app/graphql/types.d';
import { Option as OptionType } from '@app/types';
import { GET_ALL_PUBLISHING_HOUSES } from '@app/graphql/queries';
import { ADD_BOOK } from '@app/graphql/mutations';
import { EMPTY_STRING, WARNING_TITLE } from '@app/constants';
import { openNotification } from '@app/utils';

import styles from './styles.module.scss';

type BookForm = {
  bookName: string | undefined;
  authorName: string | undefined;
  publishingHouse: string | undefined;
};

export const AddBookForm: FC = () => {
  const [form] = Form.useForm<BookForm>();

  const {
    data: phData,
    loading: phLoading,
    error: phError,
  } = useQuery<
    GetAllPublishingHousesQuery,
    GetAllPublishingHousesQueryVariables
  >(GET_ALL_PUBLISHING_HOUSES);

  const publishingHouseOptions: OptionType[] = useMemo(() => {
    return (
      phData?.getAllPublishingHouses
        ?.filter((item) => !!(item?.id && item.name))
        .map((item) => {
          return {
            label: item?.name || EMPTY_STRING,
            value: item?.id || EMPTY_STRING,
          };
        }) || []
    );
  }, [phData]);

  const [addBookRequest, { loading: abLoading }] = useMutation<
    AddBookMutation,
    AddBookMutationVariables
  >(ADD_BOOK);

  const addBook = (values: BookForm) => {
    addBookRequest({
      variables: {
        name: values.bookName || EMPTY_STRING,
        author: values.authorName || EMPTY_STRING,
        publishingHouseId: values.publishingHouse || EMPTY_STRING,
      },
      refetchQueries: ['getAllBooks'],
      onCompleted: (data) => {
        if (data.addBook?.result?.status === ResultStatusEnum.Ok) {
          form.resetFields();
          openNotification(
            EMPTY_STRING,
            `Книга ${
              data.addBook?.book?.name || EMPTY_STRING
            } успешно добавлена`,
            'success',
          );
          return;
        }

        throw new Error();
      },
      onError: () => {
        openNotification(
          WARNING_TITLE,
          'Произошла ошибка при добавлении новой книги',
          'error',
        );
      },
    });
  };

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
