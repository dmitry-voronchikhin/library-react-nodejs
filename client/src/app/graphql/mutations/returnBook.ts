import { gql } from '@apollo/client';

export const RETURN_BOOK = gql`
  mutation returnBook($bookId: String) {
    returnBook(bookId: $bookId) {
      result {
        status
      }
    }
  }
`;
