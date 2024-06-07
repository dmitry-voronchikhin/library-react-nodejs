import { ApolloError, useQuery } from '@apollo/client';

import {
  Book,
  GetBooksByReaderQuery,
  GetBooksByReaderQueryVariables,
} from '@app/graphql/types.d';
import { GET_BOOKS_BY_READER } from '@app/graphql/queries/getBooksByReader';

type Result = {
  books: (Book | null)[];
  isLoading: boolean;
  error: ApolloError | undefined;
  refetch: () => void;
};

export const useGetBooksByReader = ({
  readerId,
}: {
  readerId: string;
}): Result => {
  const { data, loading, error, refetch } = useQuery<
    GetBooksByReaderQuery,
    GetBooksByReaderQueryVariables
  >(GET_BOOKS_BY_READER, {
    variables: {
      readerId,
    },
    fetchPolicy: 'cache-first',
  });

  const books =
    data?.getBooksByReader?.books?.filter(
      (item) => item !== null && item !== undefined,
    ) || [];

  return {
    books,
    isLoading: loading,
    error,
    refetch,
  };
};
