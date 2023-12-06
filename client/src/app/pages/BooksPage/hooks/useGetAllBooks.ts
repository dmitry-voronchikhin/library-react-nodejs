import { useQuery } from '@apollo/client';

import { GET_ALL_BOOKS } from '@app/graphql/queries';
import {
  Book,
  GetAllBooksQuery,
  GetAllBooksQueryVariables,
} from '@app/graphql/types.d';
import { PAGE_SIZE } from '../constants';

type Result = {
  books: (Book | null)[];
  count: number;
  isLoading: boolean;
};

export const useGetAllBooks = ({
  currentPage,
}: {
  currentPage: number;
}): Result => {
  const { data, loading } = useQuery<
    GetAllBooksQuery,
    GetAllBooksQueryVariables
  >(GET_ALL_BOOKS, {
    variables: {
      page: currentPage,
      count: PAGE_SIZE,
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
  };
};
