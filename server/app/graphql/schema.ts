import { gql } from "apollo-server-express";

export const typeDefs = gql`
  type Book {
    id: String
    name: String
    author: String
    publishingHouse: String
  }

  input AddBookInput {
    name: String
    publishingHouseId: String
    author: String
  }

  type Query {
    getAllBooks: [Book]
  }

  type Mutation {
    addBook(request: AddBookInput): Book
  }
`;
