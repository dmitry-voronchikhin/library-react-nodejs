import { AddBookInput, RemoveBookInput } from "../graphql/types";
import { prisma } from "../prisma";

class BooksService {
  async getAllBooks() {
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
