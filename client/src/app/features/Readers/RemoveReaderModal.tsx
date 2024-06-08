import { Modal } from 'antd';
import React, { FC } from 'react';

import { Reader } from '@app/graphql/types';
import { EMPTY_STRING } from '@app/constants';
import { useRemoveReader } from './hooks';

type Props = {
  reader: Reader;
  onClose: () => void;
};
export const RemoveReaderModal: FC<Props> = ({ reader, onClose }) => {
  const { removeReader, isLoading } = useRemoveReader(onClose);

  return (
    <Modal
      open
      okText="ОК"
      okButtonProps={{ disabled: isLoading }}
      cancelText="Отменить"
      closable={false}
      onCancel={onClose}
      onOk={() => {
        reader && removeReader(reader.id || EMPTY_STRING);
      }}
    >
      <span>
        {`Вы действительно хотите удалить читателя ${
          reader?.name || EMPTY_STRING
        }?`}
      </span>
    </Modal>
  );
};
