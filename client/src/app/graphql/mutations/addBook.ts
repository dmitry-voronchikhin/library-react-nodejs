import { gql } from '@apollo/client';

export const ADD_BOOK = gql`
  mutation addBook($name: String, $author: String, $publishingHouseId: String) {
    addBook(
      name: $name
      author: $author
      publishingHouseId: $publishingHouseId
    ) {
      name
      author
    }
  }
`;
