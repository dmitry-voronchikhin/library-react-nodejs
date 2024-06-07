import { gql } from '@apollo/client';

export const ISSUE_BOOK = gql`
  mutation issueBook($readerId: String, $bookId: String) {
    issueBook(readerId: $readerId, bookId: $bookId) {
      result {
        status
      }
    }
  }
`;
