"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductService = void 0;
const db_1 = require("../../config/db");
const helpers_1 = require("../../utils/helpers");
class ProductService {
    static async createProduct(data) {
        return db_1.prisma.product.create({ data });
    }
    static async updateProduct(id, data) {
        const product = await db_1.prisma.product.findUnique({ where: { id } });
        if (!product)
            throw new helpers_1.AppError('Product not found', 404);
        return db_1.prisma.product.update({
            where: { id },
            data,
        });
    }
    static async deleteProduct(id) {
        const product = await db_1.prisma.product.findUnique({ where: { id } });
        if (!product)
            throw new helpers_1.AppError('Product not found', 404);
        return db_1.prisma.product.delete({ where: { id } });
    }
    static async getProductById(id) {
        const product = await db_1.prisma.product.findUnique({ where: { id } });
        if (!product)
            throw new helpers_1.AppError('Product not found', 404);
        return product;
    }
    static async getAllProducts(page = 1, limit = 10, search) {
        const skip = (page - 1) * limit;
        const whereClause = search
            ? {
                OR: [
                    { name: { contains: search, mode: 'insensitive' } },
                    { description: { contains: search, mode: 'insensitive' } },
                ],
            }
            : {};
        const [products, total] = await Promise.all([
            db_1.prisma.product.findMany({
                where: whereClause,
                skip,
                take: limit,
                orderBy: { createdAt: 'desc' },
            }),
            db_1.prisma.product.count({ where: whereClause }),
        ]);
        return {
            products,
            meta: {
                total,
                page,
                limit,
                totalPages: Math.ceil(total / limit),
            },
        };
    }
}
exports.ProductService = ProductService;
