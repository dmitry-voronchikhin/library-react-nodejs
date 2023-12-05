import { gql } from '@apollo/client';

export const ADD_PUBLISHING_HOUSE = gql`
  mutation addPublishingHouse($name: String, $address: String) {
    addPublishingHouse(name: $name, address: $address) {
      publishingHouse {
        name
      }
      result {
        status
      }
    }
  }
`;
