import { Button, Form, Input } from 'antd';
import React, { FC } from 'react';

import { Reader } from '@app/graphql/types';
import { ReaderForm as ReaderFormType } from './types';

import styles from './styles.module.scss';

const REQUIRED_RULE = {
  required: true,
  message: 'Обязательное поле',
};

type Props = {
  reader?: Reader;
  isLoading: boolean;
  submitButtonText: string;
  onSubmit: (values: ReaderFormType) => void;
};

export const ReaderForm: FC<Props> = ({
  reader,
  isLoading,
  submitButtonText,
  onSubmit,
}) => {
  const [form] = Form.useForm<ReaderFormType>();

  return (
    <Form
      form={form}
      name="basic"
      onFinish={onSubmit}
      initialValues={reader}
      labelCol={{
        span: 9,
      }}
    >
      <div className={styles.ReaderFormContainer}>
        <Form.Item
          className={styles.FormItem}
          name="name"
          label="ФИО"
          rules={[REQUIRED_RULE]}
        >
          <Input placeholder="ФИО" type="text" size="large" />
        </Form.Item>
        <Form.Item
          className={styles.FormItem}
          name="birthDate"
          label="Дата рождения"
          rules={[REQUIRED_RULE]}
        >
          <Input placeholder="Дата рождения" type="text" size="large" />
        </Form.Item>
        <Form.Item
          className={styles.FormItem}
          name="address"
          label="Адрес места жительства"
          rules={[REQUIRED_RULE]}
        >
          <Input placeholder="Адрес" type="text" size="large" />
        </Form.Item>
        <Form.Item
          className={styles.FormItem}
          name="phoneNumber"
          label="Номер телефона"
          rules={[REQUIRED_RULE]}
        >
          <Input placeholder="Номер телефона" type="text" size="large" />
        </Form.Item>
        <Button
          type="primary"
          htmlType="submit"
          size="large"
          loading={isLoading}
          disabled={isLoading}
          className={styles.SubmitButton}
        >
          {submitButtonText}
        </Button>
      </div>
    </Form>
  );
};
