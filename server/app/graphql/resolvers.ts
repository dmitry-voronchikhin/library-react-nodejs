import { publishingHouseService } from "../services/publishing-house.service";
import { booksService } from "../services/books.service";
import {
  AddBookInput,
  AddPublishingHouseInput,
  GetAllBooksInput,
  RemoveBookInput,
  RemovePublishingHouseInput,
} from "./types";

export const resolvers = {
  Query: {
    getAllBooks: async (_: any, variables: GetAllBooksInput) => {
      console.log("getAllBooks");
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
    addPublishingHouse: async (_: any, variables: AddPublishingHouseInput) => {
      try {
        const publishingHouse = await publishingHouseService.addPublishingHouse(
          variables
        );
        return {
          publishingHouse,
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
    removePublishingHouse: async (
      _: any,
      variables: RemovePublishingHouseInput
    ) => {
      try {
        const publishingHouse =
          await publishingHouseService.removePublishingHouse(variables);
        return {
          publishingHouse,
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
