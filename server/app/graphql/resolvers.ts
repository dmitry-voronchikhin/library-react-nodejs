import { publishingHouseService } from "../services/publishing-house.service";
import { booksService } from "../services/books.service";
import { AddBookInput } from "./types";

export const resolvers = {
  Query: {
    getAllBooks: booksService.getAllBooks,
    getAllPublishingHouses: publishingHouseService.getAllPublishingHouses,
  },
  Mutation: {
    addBook: async (_: never, variables: AddBookInput) =>
      await booksService.addBook(variables),
  },
};
