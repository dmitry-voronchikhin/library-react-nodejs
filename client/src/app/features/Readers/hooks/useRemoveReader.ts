import { useMutation } from '@apollo/client';
import { useCallback } from 'react';

import { EMPTY_STRING, WARNING_TITLE } from '@app/constants';
import { REMOVE_READER } from '@app/graphql/mutations';
import {
  RemoveReaderMutation,
  RemoveReaderMutationVariables,
  ResultStatusEnum,
} from '@app/graphql/types.d';
import { openNotification } from '@app/utils';

type Result = {
  removeReader: (id: string) => void;
  isLoading: boolean;
};

export const useRemoveReader = (onComplete: () => void): Result => {
  const [removeReaderRequest, { loading }] = useMutation<
    RemoveReaderMutation,
    RemoveReaderMutationVariables
  >(REMOVE_READER);

  const removeReader = useCallback(
    (id: string) => {
      removeReaderRequest({
        variables: {
          id,
        },
        refetchQueries: ['getAllReaders'],
        onCompleted: (data) => {
          if (data.removeReader?.result?.status === ResultStatusEnum.Ok) {
            onComplete();
            openNotification({
              title: EMPTY_STRING,
              description: `Читатель ${
                data.removeReader?.reader?.name || EMPTY_STRING
              } успешно удален`,
              type: 'success',
            });
            return;
          }

          throw new Error();
        },
        onError: () => {
          openNotification({
            title: WARNING_TITLE,
            description: 'Произошла ошибка при удалении читателя',
            type: 'error',
          });
        },
      });
    },
    [onComplete, removeReaderRequest],
  );

  return {
    removeReader,
    isLoading: loading,
  };
};
