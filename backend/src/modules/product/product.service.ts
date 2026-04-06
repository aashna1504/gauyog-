import { prisma } from '../../config/db';
import { AppError } from '../../utils/helpers';
import { Prisma } from '@prisma/client';

export class ProductService {
  static async createProduct(data: Prisma.ProductCreateInput) {
    return prisma.product.create({ data });
  }

  static async updateProduct(id: string, data: Prisma.ProductUpdateInput) {
    const product = await prisma.product.findUnique({ where: { id } });
    if (!product) throw new AppError('Product not found', 404);

    return prisma.product.update({
      where: { id },
      data,
    });
  }

  static async deleteProduct(id: string) {
    const product = await prisma.product.findUnique({ where: { id } });
    if (!product) throw new AppError('Product not found', 404);

    return prisma.product.delete({ where: { id } });
  }

  static async getProductById(id: string) {
    const product = await prisma.product.findUnique({ where: { id } });
    if (!product) throw new AppError('Product not found', 404);
    
    return product;
  }

  static async getAllProducts(page: number = 1, limit: number = 10, search?: string) {
    const skip = (page - 1) * limit;
    
    const whereClause: Prisma.ProductWhereInput = search
      ? {
          OR: [
            { name: { contains: search, mode: 'insensitive' } },
            { description: { contains: search, mode: 'insensitive' } },
          ],
        }
      : {};

    const [products, total] = await Promise.all([
      prisma.product.findMany({
        where: whereClause,
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
      }),
      prisma.product.count({ where: whereClause }),
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
