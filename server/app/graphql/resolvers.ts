import { booksService } from "../services/books.service";

export const resolvers = {
  Query: {
    getAllBooks: booksService.getAllBooks,
  },
  Mutation: {
    addBook: (parent: any, args: any, context: any, info: any) =>
      booksService.addBook(args.request),
  },
};
