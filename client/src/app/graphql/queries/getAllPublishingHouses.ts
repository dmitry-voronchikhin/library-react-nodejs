import { gql } from '@apollo/client';

export const GET_ALL_PUBLISHING_HOUSES = gql`
  query getAllPublishingHouses {
    getAllPublishingHouses {
      id
      name
      address
    }
  }
`;
