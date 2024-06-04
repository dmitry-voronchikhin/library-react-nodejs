import {
  AddReaderInput,
  GetAllReadersInput,
  RemoveReaderInput,
} from "app/graphql/types";
import { prisma } from "../prisma";

class ReadersService {
  async getAllReadersCount() {
    return (await prisma.reader.findMany()).length;
  }
  async getAllReaders(request: GetAllReadersInput) {
    const { page, count } = request;
    return await prisma.reader.findMany({
      ...(page &&
        count && {
          skip: (page - 1) * count,
          take: count,
        }),
      select: {
        name: true,
        address: true,
        id: true,
        birthDate: true,
        phoneNumber: true,
        books: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });
  }

  async addReader(request: AddReaderInput) {
    const { name, address, birthDate, phoneNumber } = request;
    return await prisma.reader.create({
      data: {
        name,
        address,
        birthDate,
        phoneNumber,
      },
    });
  }

  async removeReader(request: RemoveReaderInput) {
    const { id } = request;
    return await prisma.reader.delete({
      where: {
        id,
      },
    });
  }
}

export const readersService = new ReadersService();
