import React, { FC } from 'react';
import { Modal } from 'antd';

import { PublishingHouse } from '@app/graphql/types';
import { EMPTY_STRING } from '@app/constants';
import { useRemovePublishingHouse } from './hooks';

type Props = {
  publishingHouse: PublishingHouse;
  onCancel: () => void;
};

export const RemovePublishingHouseModal: FC<Props> = ({
  publishingHouse,
  onCancel,
}) => {
  const { removePublishingHouse } = useRemovePublishingHouse();

  return (
    <Modal
      open
      okText="ОК"
      cancelText="Отменить"
      closable={false}
      onCancel={onCancel}
      onOk={() => {
        removePublishingHouse(publishingHouse.id || EMPTY_STRING);
        onCancel();
      }}
    >
      <span>
        {`Вы действительно хотите удалить издательство ${
          publishingHouse?.name || EMPTY_STRING
        }?`}
      </span>
    </Modal>
  );
};
