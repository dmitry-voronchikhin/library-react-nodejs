import React, { FC } from 'react';
import { useQuery } from '@apollo/client';
import { compact } from 'lodash';
import { observer } from 'mobx-react-lite';

import {
  Book,
  GetAllBooksQuery,
  GetAllBooksQueryVariables,
} from '@app/graphql/types';
import { GET_ALL_BOOKS } from '@app/graphql/queries';

const BooksTableComponent: FC = () => {
  const { data, loading } = useQuery<
    GetAllBooksQuery,
    GetAllBooksQueryVariables
  >(GET_ALL_BOOKS);

  if (loading) {
    return <h1>Loading...</h1>;
  }

  const books: Book[] = compact(data?.getAllBooks);

  return (
    <table>
      <tbody>
        {books.map((book) => (
          <tr key={book.id}>
            <td>{book.name}</td>
            <td>{book.author}</td>
            <td>{book.publishingHouse}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export const BooksTable = observer(BooksTableComponent);
