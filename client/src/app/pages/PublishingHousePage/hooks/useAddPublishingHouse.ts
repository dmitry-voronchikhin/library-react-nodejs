import { useMutation } from '@apollo/client';

import { EMPTY_STRING, WARNING_TITLE } from '@app/constants';
import { ADD_PUBLISHING_HOUSE } from '@app/graphql/mutations';
import {
  AddPublishingHouseMutation,
  AddPublishingHouseMutationVariables,
  ResultStatusEnum,
} from '@app/graphql/types.d';
import { openNotification } from '@app/utils';
import { PublishingHouseForm } from '../types';
import { useCallback } from 'react';

type Result = {
  addPublishingHouse: (options: PublishingHouseForm) => void;
  isLoading: boolean;
};

export const useAddPublishingHouse = (onCompleted: () => void): Result => {
  const [addPublishingHouseRequest, { loading }] = useMutation<
    AddPublishingHouseMutation,
    AddPublishingHouseMutationVariables
  >(ADD_PUBLISHING_HOUSE);

  const addPublishingHouse = useCallback(
    ({ name, address }: PublishingHouseForm) => {
      addPublishingHouseRequest({
        variables: {
          name: name || EMPTY_STRING,
          address: address || EMPTY_STRING,
        },
        refetchQueries: ['getAllPublishingHouses'],
        onCompleted: (data) => {
          if (data.addPublishingHouse?.result?.status === ResultStatusEnum.Ok) {
            onCompleted();
            openNotification(
              EMPTY_STRING,
              `Издательство ${
                data.addPublishingHouse?.publishingHouse?.name || EMPTY_STRING
              } успешно добавлено`,
              'success',
            );
            return;
          }

          throw new Error();
        },
        onError: () => {
          openNotification(
            WARNING_TITLE,
            'Произошла ошибка при добавлении издательства',
            'error',
          );
        },
      });
    },
    [addPublishingHouseRequest, onCompleted],
  );

  return {
    addPublishingHouse,
    isLoading: loading,
  };
};
