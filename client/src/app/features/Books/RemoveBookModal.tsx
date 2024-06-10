import React, { FC } from 'react';
import { Modal } from 'antd';

import { Book } from '@app/graphql/types';
import { EMPTY_STRING } from '@app/constants';
import { useRemoveBook } from './hooks';

type Props = {
  book: Book;
  onCancel: () => void;
};

export const RemoveBookModal: FC<Props> = ({ book, onCancel }) => {
  const { removeBook } = useRemoveBook();

  return (
    <Modal
      open
      okText="ОК"
      cancelText="Отменить"
      closable={false}
      onCancel={onCancel}
      onOk={() => {
        removeBook(book.id || EMPTY_STRING);
        onCancel();
      }}
    >
      <span>
        {`Вы действительно хотите удалить книгу ${book.name || EMPTY_STRING}?`}
      </span>
    </Modal>
  );
};
