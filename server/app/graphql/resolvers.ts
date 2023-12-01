import { publishingHouseService } from "../services/publishing-house.service";
import { booksService } from "../services/books.service";
import { AddBookInput, RemoveBookInput } from "./types";

export const resolvers = {
  Query: {
    getAllBooks: booksService.getAllBooks,
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
