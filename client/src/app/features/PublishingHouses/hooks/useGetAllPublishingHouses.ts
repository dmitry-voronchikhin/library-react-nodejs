import { ApolloError, useQuery } from '@apollo/client';

import { GET_ALL_PUBLISHING_HOUSES } from '@app/graphql/queries';
import {
  GetAllPublishingHousesQuery,
  GetAllPublishingHousesQueryVariables,
  PublishingHouse,
} from '@app/graphql/types.d';

type Result = {
  publishingHouses: (PublishingHouse | null)[];
  isLoading: boolean;
  error: ApolloError | undefined;
};

export const useGetAllPublishingHouses = (): Result => {
  const { data, loading, error } = useQuery<
    GetAllPublishingHousesQuery,
    GetAllPublishingHousesQueryVariables
  >(GET_ALL_PUBLISHING_HOUSES, {
    fetchPolicy: 'cache-first',
  });

  const publishingHouses =
    data?.getAllPublishingHouses?.publishingHouses?.filter(
      (item) => item !== null && item !== undefined,
    ) || [];

  return {
    publishingHouses,
    isLoading: loading,
    error,
  };
};
