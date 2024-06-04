import { useMutation } from '@apollo/client';
import { useCallback } from 'react';

import { EMPTY_STRING, WARNING_TITLE } from '@app/constants';
import { ADD_READER } from '@app/graphql/mutations';
import {
  AddReaderMutation,
  AddReaderMutationVariables,
  ResultStatusEnum,
} from '@app/graphql/types.d';
import { openNotification } from '@app/utils';
import { ReaderForm } from '../types';

type Result = {
  addReader: (values: ReaderForm) => void;
  isLoading: boolean;
};

export const useAddReader = (onComplete: () => void): Result => {
  const [addReaderRequest, { loading }] = useMutation<
    AddReaderMutation,
    AddReaderMutationVariables
  >(ADD_READER);

  const addReader = useCallback(
    (values: ReaderForm) => {
      addReaderRequest({
        variables: {
          name: values.name || EMPTY_STRING,
          birthDate: values.birthDate || EMPTY_STRING,
          address: values.address || EMPTY_STRING,
          phoneNumber: values.phoneNumber || EMPTY_STRING,
        },
        refetchQueries: ['getAllReaders'],
        onCompleted: (data) => {
          if (data.addReader?.result?.status === ResultStatusEnum.Ok) {
            onComplete();
            openNotification({
              title: EMPTY_STRING,
              description: `Читатель ${
                data.addReader?.reader?.name || EMPTY_STRING
              } успешно добавлен`,
              type: 'success',
            });
            return;
          }

          throw new Error();
        },
        onError: () => {
          openNotification({
            title: WARNING_TITLE,
            description: 'Произошла ошибка при добавлении читателя',
            type: 'error',
          });
        },
      });
    },
    [addReaderRequest, onComplete],
  );

  return { addReader, isLoading: loading };
};
