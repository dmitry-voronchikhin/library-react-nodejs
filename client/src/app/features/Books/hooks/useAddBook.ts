import { useMutation } from '@apollo/client';
import { useCallback } from 'react';

import { EMPTY_STRING, WARNING_TITLE } from '@app/constants';
import { ADD_BOOK } from '@app/graphql/mutations';
import {
  AddBookMutation,
  AddBookMutationVariables,
  ResultStatusEnum,
} from '@app/graphql/types.d';
import { openNotification } from '@app/utils';
import { BookForm } from '../types';

type Result = {
  addBook: (values: BookForm) => void;
  isLoading: boolean;
};

export const useAddBook = (onComplete: () => void): Result => {
  const [addBookRequest, { loading }] = useMutation<
    AddBookMutation,
    AddBookMutationVariables
  >(ADD_BOOK);

  const addBook = useCallback(
    (values: BookForm) => {
      addBookRequest({
        variables: {
          name: values.bookName || EMPTY_STRING,
          author: values.authorName || EMPTY_STRING,
          publishingHouseId: values.publishingHouse || EMPTY_STRING,
        },
        refetchQueries: ['getAllBooks'],
        onCompleted: (data) => {
          if (data.addBook?.result?.status === ResultStatusEnum.Ok) {
            onComplete();
            openNotification({
              title: EMPTY_STRING,
              description: `Книга ${
                data.addBook?.book?.name || EMPTY_STRING
              } успешно добавлена`,
              type: 'success',
            });
            return;
          }

          throw new Error();
        },
        onError: () => {
          openNotification({
            title: WARNING_TITLE,
            description: 'Произошла ошибка при добавлении новой книги',
            type: 'error',
          });
        },
      });
    },
    [addBookRequest, onComplete],
  );

  return { addBook, isLoading: loading };
};
