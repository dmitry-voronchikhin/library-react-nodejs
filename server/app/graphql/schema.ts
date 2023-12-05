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

  type PublishingHouse {
    id: String
    name: String
    address: String
  }

  input GetAllBooksInput {
    page: Int
    count: Int
  }

  type GetAllBooksOutput {
    books: [Book]
    page: Int
    count: Int
  }

  input AddBookInput {
    name: String
    publishingHouseId: String
    author: String
  }

  type AddBookOutput {
    book: Book
    result: ResultStatus
  }

  type RemoveBookInput {
    id: String
  }

  type RemoveBookOutput {
    book: Book
    result: ResultStatus
  }

  type GetAllPublishingHousesOutput {
    publishingHouses: [PublishingHouse]
  }

  input AddPublishingHouseInput {
    name: String
    address: String
  }

  type AddPublishingHouseOutput {
    publishingHouse: PublishingHouse
    result: ResultStatus
  }

  type RemovePublishingHouseInput {
    id: String
  }

  type RemovePublishingHouseOutput {
    publishingHouse: PublishingHouse
    result: ResultStatus
  }

  type Query {
    getAllBooks(page: Int, count: Int): GetAllBooksOutput
    getAllPublishingHouses: GetAllPublishingHousesOutput
  }

  type Mutation {
    addBook(
      name: String
      author: String
      publishingHouseId: String
    ): AddBookOutput
    removeBook(id: String): RemoveBookOutput
    addPublishingHouse(name: String, address: String): AddPublishingHouseOutput
    removePublishingHouse(id: String): RemovePublishingHouseOutput
  }
`;
