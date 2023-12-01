import { gql } from '@apollo/client';

export const GET_ALL_BOOKS = gql`
  query getAllBooks($page: Int, $count: Int) {
    getAllBooks(page: $page, count: $count) {
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
