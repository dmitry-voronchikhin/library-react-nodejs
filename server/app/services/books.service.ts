import {
  AddBookInput,
  BooksTypeEnum,
  GetAllBooksInput,
  GetBooksByReaderInput,
  IssueBookInput,
  RemoveBookInput,
  ReturnBookInput,
} from "../graphql/types";
import { prisma } from "../prisma";

class BooksService {
  async getAllBooksCount(request: GetAllBooksInput) {
    return (
      await prisma.book.findMany({
        where: {
          ...(request.type === BooksTypeEnum.ISSUED && {
            NOT: {
              readerId: null,
            },
          }),
          ...(request.type === BooksTypeEnum.NOT_ISSUED && {
            readerId: null,
          }),
          ...(request.type === BooksTypeEnum.NOT_ISSUED && {}),
        },
      })
    ).length;
  }
  async getAllBooks(request: GetAllBooksInput) {
    const { page, count, type } = request;
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
        ...(type === BooksTypeEnum.ISSUED && {
          NOT: {
            readerId: null,
          },
        }),
        ...(type === BooksTypeEnum.NOT_ISSUED && {
          readerId: null,
        }),
        ...(type === BooksTypeEnum.NOT_ISSUED && {}),
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
            address: true,
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

  async issueBook(request: IssueBookInput) {
    const { readerId, bookId } = request;
    return await prisma.book.update({
      where: {
        id: bookId,
      },
      data: {
        readerId,
      },
    });
  }

  async returnBook(request: ReturnBookInput) {
    const { bookId } = request;
    return await prisma.book.update({
      where: {
        id: bookId,
      },
      data: {
        readerId: null,
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
