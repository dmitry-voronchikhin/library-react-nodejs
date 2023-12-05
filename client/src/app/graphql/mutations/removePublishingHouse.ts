import { gql } from '@apollo/client';

export const REMOVE_PUBLISHING_HOUSE = gql`
  mutation removePublishingHouse($id: String) {
    removePublishingHouse(id: $id) {
      publishingHouse {
        name
      }
      result {
        status
      }
    }
  }
`;
