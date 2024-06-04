import React, { FC } from 'react';
import { Button, Result } from 'antd';

type Props = {
  message?: string;
  primaryButtonText?: string;
  secondaryButtonText?: string;
  onPrimaryButtonClick?: () => void;
  onSecondaryButtonClick?: () => void;
};

export const ErrorResult: FC<Props> = ({
  message,
  primaryButtonText,
  secondaryButtonText,
  onPrimaryButtonClick,
  onSecondaryButtonClick,
}) => {
  return (
    <Result
      status="error"
      title={message || 'Произошла ошибка при загрузке данных'}
      extra={[
        <Button
          key="buy"
          type="primary"
          onClick={() => {
            onPrimaryButtonClick?.();
          }}
        >
          {primaryButtonText || 'Попробовать снова'}
        </Button>,
        <Button
          key="buy"
          onClick={() => {
            onSecondaryButtonClick?.();
          }}
        >
          {secondaryButtonText || 'Вернуться на главную'}
        </Button>,
      ]}
    />
  );
};
