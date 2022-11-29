import { AddBookInput } from "../graphql/types";
import { prisma } from "../prisma";

class BooksService {
  async getAllBooks() {
    return await prisma.book.findMany();
  }

  async addBook(request: AddBookInput) {
    const { name, publishingHouseId, author } = request;
    return await prisma.book.create({
      data: {
        name,
        publishingHouseId,
        author,
      },
    });
  }
}

export const booksService = new BooksService();
