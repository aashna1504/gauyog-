"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CartService = void 0;
const db_1 = require("../../config/db");
const helpers_1 = require("../../utils/helpers");
class CartService {
    static async getCart(userId) {
        const cart = await db_1.prisma.cart.findUnique({
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
            throw new helpers_1.AppError('Cart not found', 404);
        }
        return cart;
    }
    static async addToCart(userId, productId, quantity) {
        const cart = await db_1.prisma.cart.findUnique({ where: { userId } });
        if (!cart)
            throw new helpers_1.AppError('Cart not found', 404);
        const product = await db_1.prisma.product.findUnique({ where: { id: productId } });
        if (!product)
            throw new helpers_1.AppError('Product not found', 404);
        if (product.stock < quantity) {
            throw new helpers_1.AppError('Not enough stock available', 400);
        }
        // Check if item already in cart
        const existingItem = await db_1.prisma.cartItem.findUnique({
            where: {
                cartId_productId: { cartId: cart.id, productId },
            },
        });
        if (existingItem) {
            return db_1.prisma.cartItem.update({
                where: { id: existingItem.id },
                data: { quantity: existingItem.quantity + quantity },
            });
        }
        return db_1.prisma.cartItem.create({
            data: {
                cartId: cart.id,
                productId,
                quantity,
            },
        });
    }
    static async updateCartItemQuantity(userId, itemId, quantity) {
        const cart = await db_1.prisma.cart.findUnique({ where: { userId } });
        if (!cart)
            throw new helpers_1.AppError('Cart not found', 404);
        const cartItem = await db_1.prisma.cartItem.findUnique({
            where: { id: itemId },
            include: { product: true },
        });
        if (!cartItem || cartItem.cartId !== cart.id) {
            throw new helpers_1.AppError('Cart item not found in your cart', 404);
        }
        if (cartItem.product.stock < quantity) {
            throw new helpers_1.AppError('Not enough stock available', 400);
        }
        return db_1.prisma.cartItem.update({
            where: { id: itemId },
            data: { quantity },
        });
    }
    static async removeCartItem(userId, itemId) {
        const cart = await db_1.prisma.cart.findUnique({ where: { userId } });
        if (!cart)
            throw new helpers_1.AppError('Cart not found', 404);
        const cartItem = await db_1.prisma.cartItem.findUnique({ where: { id: itemId } });
        if (!cartItem || cartItem.cartId !== cart.id) {
            throw new helpers_1.AppError('Cart item not found in your cart', 404);
        }
        return db_1.prisma.cartItem.delete({ where: { id: itemId } });
    }
    static async clearCart(userId) {
        const cart = await db_1.prisma.cart.findUnique({ where: { userId } });
        if (!cart)
            throw new helpers_1.AppError('Cart not found', 404);
        return db_1.prisma.cartItem.deleteMany({
            where: { cartId: cart.id },
        });
    }
}
exports.CartService = CartService;
