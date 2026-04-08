"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WishlistService = void 0;
const db_1 = require("../../config/db");
const helpers_1 = require("../../utils/helpers");
class WishlistService {
    static async getWishlist(userId) {
        return db_1.prisma.wishlist.findMany({
            where: { userId },
            include: { product: true },
            orderBy: { createdAt: 'desc' },
        });
    }
    static async addToWishlist(userId, productId) {
        const product = await db_1.prisma.product.findUnique({ where: { id: productId } });
        if (!product)
            throw new helpers_1.AppError('Product not found', 404);
        const existing = await db_1.prisma.wishlist.findUnique({
            where: { userId_productId: { userId, productId } },
        });
        if (existing)
            throw new helpers_1.AppError('Product already in wishlist', 409);
        return db_1.prisma.wishlist.create({ data: { userId, productId } });
    }
    static async removeFromWishlist(userId, productId) {
        const item = await db_1.prisma.wishlist.findUnique({
            where: { userId_productId: { userId, productId } },
        });
        if (!item)
            throw new helpers_1.AppError('Wishlist item not found', 404);
        return db_1.prisma.wishlist.delete({
            where: { userId_productId: { userId, productId } },
        });
    }
}
exports.WishlistService = WishlistService;
