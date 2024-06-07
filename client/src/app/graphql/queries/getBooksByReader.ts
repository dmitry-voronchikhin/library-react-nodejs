import { gql } from '@apollo/client';

export const GET_BOOKS_BY_READER = gql`
  query getBooksByReader($readerId: String) {
    getBooksByReader(readerId: $readerId) {
      books {
        author
        id
        name
        publishingHouse {
          name
          address
        }
      }
    }
  }
`;
