import { ApolloError, useQuery } from '@apollo/client';

import { GET_ALL_BOOKS } from '@app/graphql/queries';
import {
  Book,
  BooksTypeEnum,
  GetAllBooksQuery,
  GetAllBooksQueryVariables,
} from '@app/graphql/types.d';

type Result = {
  books: (Book | null)[];
  count: number;
  isLoading: boolean;
  error: ApolloError | undefined;
  refetch: () => void;
};

export const useGetAllBooks = ({
  currentPage,
  pageSize,
  type,
}: {
  currentPage?: number;
  pageSize?: number;
  type?: BooksTypeEnum;
}): Result => {
  const { data, loading, error, refetch } = useQuery<
    GetAllBooksQuery,
    GetAllBooksQueryVariables
  >(GET_ALL_BOOKS, {
    variables: {
      page: currentPage,
      count: pageSize,
      type,
    },
    fetchPolicy: 'cache-first',
  });

  const books =
    data?.getAllBooks?.books?.filter(
      (item) => item !== null && item !== undefined,
    ) || [];

  const count = data?.getAllBooks?.count || 0;

  return {
    books,
    count,
    isLoading: loading,
    error,
    refetch,
  };
};
