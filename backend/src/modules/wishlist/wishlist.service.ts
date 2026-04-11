import { prisma } from '../../config/db';
import { AppError } from '../../utils/helpers';

export class WishlistService {
  static async getWishlist(userId: string) {
    return prisma.wishlist.findMany({
      where: { userId },
      include: { product: true },
      orderBy: { createdAt: 'desc' },
    });
  }

  static async addToWishlist(userId: string, productId: string) {
    const product = await prisma.product.findUnique({ where: { id: productId } });
    if (!product) throw new AppError('Product not found', 404);

    const existing = await prisma.wishlist.findUnique({
      where: { userId_productId: { userId, productId } },
    });
    if (existing) throw new AppError('Product already in wishlist', 409);

    return prisma.wishlist.create({ data: { userId, productId } });
  }

  static async removeFromWishlist(userId: string, productId: string) {
    const item = await prisma.wishlist.findUnique({
      where: { userId_productId: { userId, productId } },
    });
    if (!item) throw new AppError('Wishlist item not found', 404);

    return prisma.wishlist.delete({
      where: { userId_productId: { userId, productId } },
    });
  }
}
