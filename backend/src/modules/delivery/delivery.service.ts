import { prisma } from '../../config/db';

export class DeliveryService {
  static async getDeliveryDetails(userId: string) {
    return prisma.deliveryDetails.findUnique({ where: { userId } });
  }

  static async upsertDeliveryDetails(
    userId: string,
    data: {
      firstName?: string;
      lastName?: string;
      phone?: string;
      email?: string;
      building?: string;
      address?: string;
    }
  ) {
    return prisma.deliveryDetails.upsert({
      where: { userId },
      update: data,
      create: { userId, ...data },
    });
  }
}
