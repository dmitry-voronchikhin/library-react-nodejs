import React, { FC, useContext, useEffect, useState } from 'react';
import { Button, Form, Input, Typography } from 'antd';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { AxiosError } from 'axios';
import { useNavigate } from 'react-router-dom';

import {
  DEFAULT_TECHNICAL_ERROR,
  EMPTY_STRING,
  WARNING_TITLE,
} from '@constants';
import { ErrorResponse } from '@app/api/types';
import { openNotification } from '@app/utils';
import { Context } from '@app/App';

import styles from './styles.module.scss';
import { observer } from 'mobx-react-lite';

export const LoginFormComponent: FC = () => {
  const [email, setEmail] = useState<string>(EMPTY_STRING);
  const [password, setPassword] = useState<string>(EMPTY_STRING);
  const [loading, setLoading] = useState<boolean>(false);
  const { store } = useContext(Context);
  const navigate = useNavigate();

  const redirectToHome = () => {
    if (store.isAuth) {
      navigate('/');
    }
  };

  useEffect(() => {
    redirectToHome();
  });

  const onSubmit = async () => {
    setLoading(true);

    store
      .login(email, password)
      .then(() => {
        redirectToHome();
      })
      .catch((error: AxiosError<ErrorResponse>) => {
        const errorMessage = error.response?.data?.error?.message;

        openNotification(
          WARNING_TITLE,
          errorMessage || DEFAULT_TECHNICAL_ERROR,
          'error',
        );
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <Form name="basic" onFinish={onSubmit}>
      <Typography.Title>Вход в систему</Typography.Title>
      <Form.Item
        name="email"
        rules={[
          {
            required: true,
            message: 'Введите email',
            pattern: /^[\w-\\.]+@([\w-]+\.)+[\w-]{2,4}$/g,
          },
        ]}
      >
        <Input
          type="text"
          placeholder="Email"
          size="large"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          prefix={<UserOutlined />}
        />
      </Form.Item>
      <Form.Item
        name="password"
        rules={[{ required: true, message: 'Введите пароль' }]}
      >
        <Input.Password
          type="password"
          placeholder="Пароль"
          size="large"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          prefix={<LockOutlined />}
        />
      </Form.Item>
      <Form.Item>
        <Button
          className={styles.LoginFormButton}
          type="primary"
          htmlType="submit"
          size="large"
          loading={loading}
          disabled={loading}
        >
          Войти
        </Button>
      </Form.Item>
    </Form>
  );
};

export const LoginForm = observer(LoginFormComponent);
