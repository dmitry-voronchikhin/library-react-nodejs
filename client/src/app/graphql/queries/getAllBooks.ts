import { gql } from '@apollo/client';

export const GET_ALL_BOOKS = gql`
  query getAllBooks($page: Int, $count: Int, $type: String) {
    getAllBooks(page: $page, count: $count, type: $type) {
      books {
        author
        id
        name
        publishingHouse {
          name
        }
      }
      count
    }
  }
`;
