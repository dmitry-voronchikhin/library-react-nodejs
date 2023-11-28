import { gql } from "apollo-server-express";

export const typeDefs = gql`
  type Book {
    id: String
    name: String
    author: String
    publishingHouse: PublishingHouse
  }

  type PublishingHouse {
    id: String
    name: String
    address: String
  }

  input AddBookInput {
    name: String
    publishingHouseId: String
    author: String
  }

  type Query {
    getAllBooks: [Book]
    getAllPublishingHouses: [PublishingHouse]
  }

  type Mutation {
    addBook(request: AddBookInput): Book
  }
`;
