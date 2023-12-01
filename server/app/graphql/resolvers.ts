import { publishingHouseService } from "../services/publishing-house.service";
import { booksService } from "../services/books.service";
import { AddBookInput, GetAllBooksInput, RemoveBookInput } from "./types";

export const resolvers = {
  Query: {
    getAllBooks: async (_: any, variables: GetAllBooksInput) => {
      const books = await booksService.getAllBooks(variables);
      const count = await booksService.getAllBooksCount();

      return {
        books,
        count,
      };
    },
    getAllPublishingHouses: publishingHouseService.getAllPublishingHouses,
  },
  Mutation: {
    addBook: async (_: any, variables: AddBookInput) => {
      try {
        const book = await booksService.addBook(variables);
        return {
          book,
          result: {
            status: "OK",
          },
        };
      } catch {
        return {
          result: {
            status: "ERROR",
          },
        };
      }
    },
    removeBook: async (_: any, variables: RemoveBookInput) => {
      try {
        const book = await booksService.removeBook(variables);
        return {
          book,
          result: {
            status: "OK",
          },
        };
      } catch {
        return {
          result: {
            status: "ERROR",
          },
        };
      }
    },
  },
};
