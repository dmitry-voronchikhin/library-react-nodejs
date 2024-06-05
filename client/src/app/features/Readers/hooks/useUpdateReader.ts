import { useMutation } from '@apollo/client';
import { useCallback } from 'react';

import { EMPTY_STRING, WARNING_TITLE } from '@app/constants';
import {
  ResultStatusEnum,
  UpdateReaderMutation,
  UpdateReaderMutationVariables,
} from '@app/graphql/types.d';
import { UPDATE_READER } from '@app/graphql/mutations/updateReader';
import { openNotification } from '@app/utils';
import { ReaderForm } from '../types';

type Result = {
  updateReader: (values: ReaderForm) => void;
  isLoading: boolean;
};

export const useUpdateReader = (onComplete: () => void): Result => {
  const [updateReaderRequest, { loading }] = useMutation<
    UpdateReaderMutation,
    UpdateReaderMutationVariables
  >(UPDATE_READER);

  const updateReader = useCallback(
    (values: ReaderForm) => {
      updateReaderRequest({
        variables: {
          id: values.id || EMPTY_STRING,
          name: values.name || EMPTY_STRING,
          birthDate: values.birthDate || EMPTY_STRING,
          address: values.address || EMPTY_STRING,
          phoneNumber: values.phoneNumber || EMPTY_STRING,
        },
        refetchQueries: ['getAllReaders'],
        onCompleted: (data) => {
          if (data.updateReader?.result?.status === ResultStatusEnum.Ok) {
            onComplete();
            openNotification({
              title: EMPTY_STRING,
              description: `Данные читателя ${
                data.updateReader?.reader?.name || EMPTY_STRING
              } успешно обновлены`,
              type: 'success',
            });
            return;
          }

          throw new Error();
        },
        onError: () => {
          openNotification({
            title: WARNING_TITLE,
            description: 'Произошла ошибка при обновлении данных читателя',
            type: 'error',
          });
        },
      });
    },
    [updateReaderRequest, onComplete],
  );

  return { updateReader, isLoading: loading };
};
