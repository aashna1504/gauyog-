"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductService = void 0;
const db_1 = require("../../config/db");
const helpers_1 = require("../../utils/helpers");
function generateSlug(name) {
    return name
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-')
        .replace(/^-+|-+$/g, '');
}
async function uniqueSlug(name, excludeId) {
    const base = generateSlug(name);
    let slug = base;
    let counter = 1;
    while (true) {
        const existing = await db_1.prisma.product.findFirst({
            where: { slug, ...(excludeId ? { id: { not: excludeId } } : {}) },
        });
        if (!existing)
            return slug;
        slug = `${base}-${counter++}`;
    }
}
const UUID_PATTERN = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
class ProductService {
    static async createProduct(data) {
        const slug = await uniqueSlug(data.name);
        return db_1.prisma.product.create({ data: { ...data, slug } });
    }
    static async updateProduct(id, data) {
        const product = await db_1.prisma.product.findUnique({ where: { id } });
        if (!product)
            throw new helpers_1.AppError('Product not found', 404);
        const updatedData = { ...data };
        if (data.name && typeof data.name === 'string' && data.name !== product.name) {
            updatedData.slug = await uniqueSlug(data.name, id);
        }
        // Back-fill slug if product doesn't have one yet
        if (!product.slug) {
            updatedData.slug = await uniqueSlug(product.name, id);
        }
        return db_1.prisma.product.update({ where: { id }, data: updatedData });
    }
    static async deleteProduct(id) {
        const product = await db_1.prisma.product.findUnique({ where: { id } });
        if (!product)
            throw new helpers_1.AppError('Product not found', 404);
        return db_1.prisma.$transaction(async (tx) => {
            await tx.orderItem.deleteMany({ where: { productId: id } });
            return tx.product.delete({ where: { id } });
        });
    }
    static async getProductById(idOrSlug) {
        // Support both UUID and slug lookup
        if (UUID_PATTERN.test(idOrSlug)) {
            const product = await db_1.prisma.product.findUnique({ where: { id: idOrSlug } });
            if (!product)
                throw new helpers_1.AppError('Product not found', 404);
            return product;
        }
        // Try slug
        const product = await db_1.prisma.product.findFirst({ where: { slug: idOrSlug } });
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
