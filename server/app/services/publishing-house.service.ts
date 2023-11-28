import { prisma } from "../prisma";

class PublishingHouseService {
  async getAllPublishingHouses() {
    return await prisma.publishingHouse.findMany();
  }
}

export const publishingHouseService = new PublishingHouseService();
