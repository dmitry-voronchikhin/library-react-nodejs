import { useMutation } from '@apollo/client';
import { useCallback } from 'react';

import { EMPTY_STRING, WARNING_TITLE } from '@app/constants';
import {
  ResultStatusEnum,
  ReturnBookMutation,
  ReturnBookMutationVariables,
} from '@app/graphql/types.d';
import { openNotification } from '@app/utils';
import { RETURN_BOOK } from '@app/graphql/mutations/returnBook';

type Result = {
  returnBook: (bookId: string) => void;
  isLoading: boolean;
};

export const useReturnBook = (onComplete: () => void): Result => {
  const [returnBookRequest, { loading }] = useMutation<
    ReturnBookMutation,
    ReturnBookMutationVariables
  >(RETURN_BOOK);

  const returnBook = useCallback(
    (bookId: string) => {
      returnBookRequest({
        variables: {
          bookId,
        },
        refetchQueries: ['getBooksByReader', 'getAllBooks'],
        onCompleted: (data) => {
          if (data.returnBook?.result?.status === ResultStatusEnum.Ok) {
            onComplete();
            openNotification({
              title: EMPTY_STRING,
              description: 'Книга успешно возвращена',
              type: 'success',
            });
            return;
          }

          throw new Error();
        },
        onError: () => {
          openNotification({
            title: WARNING_TITLE,
            description: 'Произошла ошибка при возврате книги',
            type: 'error',
          });
        },
      });
    },
    [returnBookRequest, onComplete],
  );

  return { returnBook, isLoading: loading };
};
