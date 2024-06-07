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

  type GetBooksByReaderInput {
    readerId: String
  }

  type GetBooksByReaderOutput {
    books: [Book]
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

  type Reader {
    id: String
    name: String
    address: String
    birthDate: String
    phoneNumber: String
    books: [Book]
  }

  type GetAllReadersInput {
    page: Int
    count: Int
  }

  type GetAllReadersOutput {
    readers: [Reader]
    page: Int
    count: Int
  }

  type AddReaderInput {
    name: String
    birthDate: String
    phoneNumber: String
    author: String
    address: String
  }

  type AddReaderOutput {
    reader: Reader
    result: ResultStatus
  }

  type UpdateReaderInput {
    id: String
    name: String
    birthDate: String
    phoneNumber: String
    author: String
    address: String
  }

  type UpdateReaderOutput {
    reader: Reader
    result: ResultStatus
  }

  type RemoveReaderInput {
    id: String
  }

  type RemoveReaderOutput {
    reader: Reader
    result: ResultStatus
  }

  type Query {
    getAllBooks(page: Int, count: Int): GetAllBooksOutput
    getBooksByReader(readerId: String): GetBooksByReaderOutput
    getAllPublishingHouses: GetAllPublishingHousesOutput
    getAllReaders(page: Int, count: Int): GetAllReadersOutput
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
    addReader(
      name: String
      address: String
      birthDate: String
      phoneNumber: String
    ): AddReaderOutput
    updateReader(
      id: String
      name: String
      address: String
      birthDate: String
      phoneNumber: String
    ): UpdateReaderOutput
    removeReader(id: String): RemoveReaderOutput
  }
`;
