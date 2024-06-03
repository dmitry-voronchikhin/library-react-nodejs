import { useMutation } from '@apollo/client';
import { useCallback } from 'react';

import { EMPTY_STRING, WARNING_TITLE } from '@app/constants';
import { REMOVE_BOOK } from '@app/graphql/mutations';
import {
  RemoveBookMutation,
  RemoveBookMutationVariables,
  ResultStatusEnum,
} from '@app/graphql/types.d';
import { openNotification } from '@app/utils';

type Result = {
  removeBook: (id: string) => void;
  isLoading: boolean;
};

export const useRemoveBook = (): Result => {
  const [removeBookRequest, { loading }] = useMutation<
    RemoveBookMutation,
    RemoveBookMutationVariables
  >(REMOVE_BOOK);

  const removeBook = useCallback(
    (id: string) => {
      removeBookRequest({
        variables: {
          id,
        },
        refetchQueries: ['getAllBooks'],
        onCompleted: (data) => {
          if (data.removeBook?.result?.status === ResultStatusEnum.Ok) {
            openNotification({
              title: EMPTY_STRING,
              description: `Книга ${
                data.removeBook?.book?.name || EMPTY_STRING
              } успешно удалена`,
              type: 'success',
            });
            return;
          }

          throw new Error();
        },
        onError: () => {
          openNotification({
            title: WARNING_TITLE,
            description: 'Произошла ошибка при удалении книги',
            type: 'error',
          });
        },
      });
    },
    [removeBookRequest],
  );

  return {
    removeBook,
    isLoading: loading,
  };
};
