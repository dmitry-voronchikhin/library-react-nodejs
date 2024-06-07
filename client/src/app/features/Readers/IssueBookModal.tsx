import { Button, Form, Modal, Select } from 'antd';
import React, { FC, useMemo } from 'react';

import { EMPTY_STRING } from '@app/constants';
import { useGetAllBooks } from '../Books/hooks';
import { useIssueBook } from './hooks/useIssueBook';

import styles from './styles.module.scss';

type Props = {
  readerId: string;
  onCancel: () => void;
};

export const IssueBookModal: FC<Props> = ({ readerId, onCancel }) => {
  const [form] = Form.useForm<{ book: string }>();

  const { books, isLoading: booksLoading } = useGetAllBooks({});
  const { issueBook, isLoading } = useIssueBook(onCancel);

  const selectBookOptions = useMemo(
    () =>
      books.map((item) => ({
        label: `${item?.name}, ${item?.author}, ${item?.publishingHouse?.name}`,
        value: item?.id || EMPTY_STRING,
      })),
    [books],
  );

  const onIssue = async (values: { book: string }) => {
    issueBook({ readerId, bookId: values.book || EMPTY_STRING });
  };

  const filterBooks = (
    input?: string,
    option?: { label: string; value: string },
  ) =>
    (option?.label ?? '')
      .toLowerCase()
      .includes(input?.toLowerCase() || EMPTY_STRING) || false;

  return (
    <Modal
      open
      title="Выдача книги"
      footer={false}
      onClose={onCancel}
      onCancel={onCancel}
    >
      <Form form={form} name="basic" onFinish={onIssue}>
        <Form.Item
          className={styles.FormItem}
          name="book"
          label="Книга"
          rules={[
            {
              required: true,
              message: 'Обязательное поле',
            },
          ]}
        >
          <Select
            showSearch
            placeholder={
              booksLoading
                ? 'Загрузка...'
                : 'Выберите книгу или начните вводить название'
            }
            optionFilterProp="children"
            filterOption={filterBooks}
            options={selectBookOptions}
            disabled={booksLoading}
          />
        </Form.Item>
        <Button
          type="primary"
          htmlType="submit"
          size="large"
          loading={isLoading}
          disabled={isLoading}
          className={styles.SubmitButton}
        >
          Выдать книгу
        </Button>
      </Form>
    </Modal>
  );
};
