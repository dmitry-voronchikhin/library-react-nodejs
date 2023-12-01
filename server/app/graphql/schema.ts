import { gql } from "apollo-server-express";

export const typeDefs = gql`
  enum ResultStatusEnum {
    OK
    ERROR
  }

  type ResultStatus {
    status: ResultStatusEnum
  }

  type Book {
    id: String
    name: String
    author: String
    publishingHouse: PublishingHouse
  }

  type AddBookOutput {
    book: Book
    result: ResultStatus
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
    addBook(
      name: String
      author: String
      publishingHouseId: String
    ): AddBookOutput
  }
`;
