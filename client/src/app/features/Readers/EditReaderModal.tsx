import React, { FC } from 'react';
import { Modal } from 'antd';

import { Reader } from '@app/graphql/types';
import { EMPTY_STRING } from '@app/constants';
import { ReaderForm } from './ReaderForm';
import { ReaderForm as ReaderFormType } from './types';
import { useUpdateReader } from './hooks';

type Props = {
  reader: Reader;
  onClose: () => void;
};

export const EditReaderModal: FC<Props> = ({ onClose, reader }) => {
  const { updateReader, isLoading } = useUpdateReader(onClose);

  const onUpdate = async (values: ReaderFormType) => {
    updateReader({ ...values, id: reader.id || EMPTY_STRING });
  };

  return (
    <Modal
      open
      onCancel={onClose}
      footer={false}
      title="Редактирование данных читателя"
    >
      <ReaderForm
        reader={reader}
        isLoading={isLoading}
        submitButtonText="Добавить"
        onSubmit={onUpdate}
      />
    </Modal>
  );
};
