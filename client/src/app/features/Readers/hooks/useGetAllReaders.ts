import { ApolloError, useQuery } from '@apollo/client';

import { GET_ALL_READERS } from '@app/graphql/queries';
import {
  GetAllReadersQuery,
  GetAllReadersQueryVariables,
  Reader,
} from '@app/graphql/types.d';
import { PAGE_SIZE } from '../constants';

type Result = {
  readers: (Reader | null)[];
  count: number;
  isLoading: boolean;
  error: ApolloError | undefined;
  refetch: () => void;
};

export const useGetAllReaders = ({
  currentPage,
}: {
  currentPage: number;
}): Result => {
  const { data, loading, error, refetch } = useQuery<
    GetAllReadersQuery,
    GetAllReadersQueryVariables
  >(GET_ALL_READERS, {
    variables: {
      page: currentPage,
      count: PAGE_SIZE,
    },
    fetchPolicy: 'cache-first',
  });

  const readers =
    data?.getAllReaders?.readers?.filter(
      (item) => item !== null && item !== undefined,
    ) || [];

  const count = data?.getAllReaders?.count || 0;

  return {
    readers,
    count,
    isLoading: loading,
    error,
    refetch,
  };
};
