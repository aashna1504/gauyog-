import { prisma } from '../../config/db';
import { AppError } from '../../utils/helpers';

export class CartService {
  static async getCart(userId: string) {
    const cart = await prisma.cart.findUnique({
      where: { userId },
      include: {
        items: {
          include: {
            product: true,
          },
        },
      },
    });

    if (!cart) {
      throw new AppError('Cart not found', 404);
    }

    return cart;
  }

  static async addToCart(userId: string, productId: string, quantity: number) {
    const cart = await prisma.cart.findUnique({ where: { userId } });
    if (!cart) throw new AppError('Cart not found', 404);

    const product = await prisma.product.findUnique({ where: { id: productId } });
    if (!product) throw new AppError('Product not found', 404);

    if (product.stock < quantity) {
      throw new AppError('Not enough stock available', 400);
    }

    // Check if item already in cart
    const existingItem = await prisma.cartItem.findUnique({
      where: {
        cartId_productId: { cartId: cart.id, productId },
      },
    });

    if (existingItem) {
      return prisma.cartItem.update({
        where: { id: existingItem.id },
        data: { quantity: existingItem.quantity + quantity },
      });
    }

    return prisma.cartItem.create({
      data: {
        cartId: cart.id,
        productId,
        quantity,
      },
    });
  }

  static async updateCartItemQuantity(userId: string, itemId: string, quantity: number) {
    const cart = await prisma.cart.findUnique({ where: { userId } });
    if (!cart) throw new AppError('Cart not found', 404);

    const cartItem = await prisma.cartItem.findUnique({
      where: { id: itemId },
      include: { product: true },
    });

    if (!cartItem || cartItem.cartId !== cart.id) {
      throw new AppError('Cart item not found in your cart', 404);
    }

    if (cartItem.product.stock < quantity) {
      throw new AppError('Not enough stock available', 400);
    }

    return prisma.cartItem.update({
      where: { id: itemId },
      data: { quantity },
    });
  }

  static async removeCartItem(userId: string, itemId: string) {
    const cart = await prisma.cart.findUnique({ where: { userId } });
    if (!cart) throw new AppError('Cart not found', 404);

    const cartItem = await prisma.cartItem.findUnique({ where: { id: itemId } });
    if (!cartItem || cartItem.cartId !== cart.id) {
      throw new AppError('Cart item not found in your cart', 404);
    }

    return prisma.cartItem.delete({ where: { id: itemId } });
  }

  static async clearCart(userId: string) {
    const cart = await prisma.cart.findUnique({ where: { userId } });
    if (!cart) throw new AppError('Cart not found', 404);

    return prisma.cartItem.deleteMany({
      where: { cartId: cart.id },
    });
  }
}
