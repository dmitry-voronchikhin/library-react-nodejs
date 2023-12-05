import { gql } from '@apollo/client';

export const GET_ALL_PUBLISHING_HOUSES = gql`
  query getAllPublishingHouses {
    getAllPublishingHouses {
      publishingHouses {
        id
        name
        address
      }
    }
  }
`;
