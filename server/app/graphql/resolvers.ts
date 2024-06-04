import { publishingHouseService } from "../services/publishing-house.service";
import { booksService } from "../services/books.service";
import { readersService } from "../services/readers.service";
import {
  AddBookInput,
  AddPublishingHouseInput,
  AddReaderInput,
  GetAllBooksInput,
  GetAllReadersInput,
  RemoveBookInput,
  RemovePublishingHouseInput,
  RemoveReaderInput,
} from "./types";

export const resolvers = {
  Query: {
    getAllBooks: async (_: unknown, variables: GetAllBooksInput) => {
      const books = await booksService.getAllBooks(variables);
      const count = await booksService.getAllBooksCount();

      return {
        books,
        count,
      };
    },
    getAllPublishingHouses: publishingHouseService.getAllPublishingHouses,
    getAllReaders: async (_: unknown, variables: GetAllReadersInput) => {
      const readers = await readersService.getAllReaders(variables);
      const count = await readersService.getAllReadersCount();

      return {
        readers,
        count,
      };
    },
  },
  Mutation: {
    addBook: async (_: unknown, variables: AddBookInput) => {
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
    removeBook: async (_: unknown, variables: RemoveBookInput) => {
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
    addPublishingHouse: async (
      _: unknown,
      variables: AddPublishingHouseInput
    ) => {
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
      _: unknown,
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
    addReader: async (_: unknown, variables: AddReaderInput) => {
      try {
        const reader = await readersService.addReader(variables);
        return {
          reader,
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
    removeReader: async (_: unknown, variables: RemoveReaderInput) => {
      try {
        const reader = await readersService.removeReader(variables);
        return {
          reader,
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
