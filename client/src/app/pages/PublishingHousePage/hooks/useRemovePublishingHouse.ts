import { useMutation } from '@apollo/client';

import {
  RemovePublishingHouseMutation,
  RemovePublishingHouseMutationVariables,
  ResultStatusEnum,
} from '@app/graphql/types.d';
import { EMPTY_STRING, WARNING_TITLE } from '@app/constants';
import { REMOVE_PUBLISHING_HOUSE } from '@app/graphql/mutations';
import { openNotification } from '@app/utils';
import { useCallback } from 'react';

type Result = {
  isLoading: boolean;
  removePublishingHouse: (id: string) => void;
};

export const useRemovePublishingHouse = (): Result => {
  const [removePublishingHouseRequest, { loading }] = useMutation<
    RemovePublishingHouseMutation,
    RemovePublishingHouseMutationVariables
  >(REMOVE_PUBLISHING_HOUSE);

  const removePublishingHouse = useCallback(
    (id: string) => {
      removePublishingHouseRequest({
        variables: {
          id,
        },
        refetchQueries: ['getAllPublishingHouses'],
        onCompleted: (data) => {
          if (
            data.removePublishingHouse?.result?.status === ResultStatusEnum.Ok
          ) {
            openNotification(
              EMPTY_STRING,
              `Издательство ${
                data.removePublishingHouse?.publishingHouse?.name ||
                EMPTY_STRING
              } успешно удалено`,
              'success',
            );
            return;
          }

          throw new Error();
        },
        onError: () => {
          openNotification(
            WARNING_TITLE,
            'Произошла ошибка при удалении издательства',
            'error',
          );
        },
      });
    },
    [removePublishingHouseRequest],
  );

  return {
    removePublishingHouse,
    isLoading: loading,
  };
};
