import React, { FC } from 'react';
import { Modal } from 'antd';

import { ReaderForm } from './ReaderForm';
import { useAddReader } from './hooks';

type Props = {
  onCancel: () => void;
};

export const AddReaderModal: FC<Props> = ({ onCancel }) => {
  const { addReader, isLoading: arLoading } = useAddReader(onCancel);

  return (
    <Modal
      open
      title="Добавление читателя"
      footer={false}
      onClose={onCancel}
      onCancel={onCancel}
    >
      <ReaderForm
        isLoading={arLoading}
        submitButtonText="Добавить"
        onSubmit={addReader}
      />
    </Modal>
  );
};
