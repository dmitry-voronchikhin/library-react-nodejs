import { gql } from '@apollo/client';

export const REMOVE_READER = gql`
  mutation removeReader($id: String) {
    removeReader(id: $id) {
      reader {
        name
      }
      result {
        status
      }
    }
  }
`;
