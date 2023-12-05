import {
  AddPublishingHouseInput,
  RemovePublishingHouseInput,
} from "app/graphql/types";
import { prisma } from "../prisma";

class PublishingHouseService {
  async getAllPublishingHouses() {
    const ph = await prisma.publishingHouse.findMany();

    return {
      publishingHouses: ph,
    };
  }

  async addPublishingHouse(request: AddPublishingHouseInput) {
    const { name, address } = request;
    return await prisma.publishingHouse.create({
      data: {
        name,
        address,
      },
    });
  }

  async removePublishingHouse(request: RemovePublishingHouseInput) {
    const { id } = request;
    return await prisma.publishingHouse.delete({
      where: {
        id,
      },
    });
  }
}

export const publishingHouseService = new PublishingHouseService();
