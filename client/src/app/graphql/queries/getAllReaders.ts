import { gql } from '@apollo/client';

export const GET_ALL_READERS = gql`
  query getAllReaders($page: Int, $count: Int) {
    getAllReaders(page: $page, count: $count) {
      readers {
        id
        name
        address
        phoneNumber
        birthDate
        books {
          id
          name
        }
      }
      count
    }
  }
`;
