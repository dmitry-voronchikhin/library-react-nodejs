import React from 'react';
import { Button, Result } from 'antd';
import { useNavigate } from 'react-router-dom';

export const NotFound: React.FC = () => {
  const navigate = useNavigate();

  const onClick = () => {
    navigate('/');
  };

  return (
    <Result
      status="404"
      title="404"
      subTitle="Извините, такая страница не существует."
      extra={
        <Button type="primary" onClick={onClick}>
          Back Home
        </Button>
      }
    />
  );
};
