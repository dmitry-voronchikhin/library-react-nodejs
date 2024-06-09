import { Modal } from 'antd';
import React, { FC } from 'react';

import { Book } from '@app/graphql/types';
import { EMPTY_STRING } from '@app/constants';
import { useReturnBook } from './hooks';

type Props = {
  book: Book;
  onClose: () => void;
};
export const ReturnBookModal: FC<Props> = ({ book, onClose }) => {
  const { returnBook, isLoading } = useReturnBook(onClose);

  return (
    <Modal
      open
      okText="ОК"
      okButtonProps={{ disabled: isLoading }}
      cancelText="Отменить"
      closable={false}
      onCancel={onClose}
      onOk={() => {
        returnBook(book.id || EMPTY_STRING);
      }}
    >
      <span>
        {`Вы действительно хотите вернуть книгу ${book?.name || EMPTY_STRING}?`}
      </span>
    </Modal>
  );
};
