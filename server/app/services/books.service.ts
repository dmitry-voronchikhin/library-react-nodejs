import {
  AddBookInput,
  GetAllBooksInput,
  GetBooksByReaderInput,
  RemoveBookInput,
} from "../graphql/types";
import { prisma } from "../prisma";

class BooksService {
  async getAllBooksCount() {
    return (await prisma.book.findMany()).length;
  }
  async getAllBooks(request: GetAllBooksInput) {
    const { page, count } = request;
    return await prisma.book.findMany({
      ...(page &&
        count && {
          skip: (page - 1) * count,
          take: count,
        }),
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
      where: {
        readerId: null,
      },
    });
  }

  async getBooksByReader(request: GetBooksByReaderInput) {
    const { readerId } = request;

    return await prisma.book.findMany({
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
      where: {
        readerId,
      },
    });
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

  async removeBook(request: RemoveBookInput) {
    const { id } = request;
    return await prisma.book.delete({
      where: {
        id,
      },
    });
  }
}

export const booksService = new BooksService();
