import { gql } from '@apollo/client';

export const UPDATE_READER = gql`
  mutation updateReader(
    $id: String
    $name: String
    $address: String
    $birthDate: String
    $phoneNumber: String
  ) {
    updateReader(
      id: $id
      name: $name
      address: $address
      phoneNumber: $phoneNumber
      birthDate: $birthDate
    ) {
      reader {
        name
      }
      result {
        status
      }
    }
  }
`;
