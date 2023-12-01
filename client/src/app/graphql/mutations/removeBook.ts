import { gql } from '@apollo/client';

export const REMOVE_BOOK = gql`
  mutation removeBook($id: String) {
    removeBook(id: $id) {
      book {
        name
      }
      result {
        status
      }
    }
  }
`;
