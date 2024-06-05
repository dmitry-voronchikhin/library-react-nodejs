import React, { FC } from 'react';
import { Button, Form, Input, Modal } from 'antd';

import { Reader } from '@app/graphql/types';
import { EMPTY_STRING } from '@app/constants';
import { ReaderForm } from './types';
import { useUpdateReader } from './hooks';

import styles from './styles.module.scss';

type Props = {
  isOpen: boolean;
  onClose: () => void;
  reader: Reader;
};

export const EditReaderModal: FC<Props> = ({ isOpen, onClose, reader }) => {
  const [form] = Form.useForm<ReaderForm>();

  const { updateReader, isLoading } = useUpdateReader(form.resetFields);

  const onUpdate = async (values: ReaderForm) => {
    await updateReader({ ...values, id: reader.id || EMPTY_STRING });
    onClose();
  };

  return (
    <Modal open={isOpen} onCancel={onClose} footer={false}>
      <Form
        form={form}
        name="basic"
        onFinish={onUpdate}
        initialValues={reader}
        labelCol={{
          span: 10,
        }}
      >
        <div className={styles.UpdateReaderFormContainer}>
          <Form.Item
            className={styles.FormItem}
            name="name"
            label="ФИО"
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
            label="Дата рождения"
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
            label="Адрес места жительства"
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
            label="Номер телефона"
            rules={[
              {
                required: true,
                message: 'Введите номер телефона',
              },
            ]}
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
            Сохранить
          </Button>
        </div>
      </Form>
    </Modal>
  );
};
