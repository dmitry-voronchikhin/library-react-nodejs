import { gql } from '@apollo/client';

export const ADD_READER = gql`
  mutation addReader(
    $name: String
    $address: String
    $birthDate: String
    $phoneNumber: String
  ) {
    addReader(
      name: $name
      address: $address
      phoneNumber: $phoneNumber
      birthDate: $birthDate
    ) {
      reader {
        name
        birthDate
      }
      result {
        status
      }
    }
  }
`;
