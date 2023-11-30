import { AddBookInput } from "../graphql/types";
import { prisma } from "../prisma";

class BooksService {
  async getAllBooks() {
    const books = await prisma.book.findMany({
      select: {
        name: true,
        author: true,
        id: true,
        publishingHouse: {
          select: {
            name: true,
          },
        },
      },
    });
    console.log(books);
    return books;
  }

  async addBook(request: AddBookInput) {
    const { name, publishingHouseId, author } = request;
    const book = await prisma.book.create({
      data: {
        name,
        publishingHouseId,
        author,
      },
    });

    return book;
  }
}

export const booksService = new BooksService();
