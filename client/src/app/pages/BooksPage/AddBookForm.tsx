import { Button, Form, Input, Select, Typography } from 'antd';
import { useMutation, useQuery } from '@apollo/client';
import React, { FC, useMemo } from 'react';

import {
  AddBookMutation,
  AddBookMutationVariables,
  GetAllPublishingHousesQuery,
  GetAllPublishingHousesQueryVariables,
} from '@app/graphql/types';
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
        form.resetFields();
        openNotification(
          EMPTY_STRING,
          `Книга ${data.addBook?.name || EMPTY_STRING} успешно добавлена`,
          'success',
        );
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
    <Form form={form} name="basic" onFinish={addBook}>
      <Typography.Title level={4}>Добавить книгу</Typography.Title>
      <div className={styles.FormItemsContainer}>
        <Form.Item
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

        <Form.Item>
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
  );
};