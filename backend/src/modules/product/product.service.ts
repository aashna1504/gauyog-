import { prisma } from '../../config/db';
import { AppError } from '../../utils/helpers';
import { Prisma } from '@prisma/client';

function generateSlug(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-+|-+$/g, '');
}

async function uniqueSlug(name: string, excludeId?: string): Promise<string> {
  const base = generateSlug(name);
  let slug = base;
  let counter = 1;
  while (true) {
    const existing = await prisma.product.findFirst({
      where: { slug, ...(excludeId ? { id: { not: excludeId } } : {}) },
    });
    if (!existing) return slug;
    slug = `${base}-${counter++}`;
  }
}

const UUID_PATTERN = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

export class ProductService {
  static async createProduct(data: Prisma.ProductCreateInput) {
    const slug = await uniqueSlug(data.name as string);
    return prisma.product.create({ data: { ...data, slug } });
  }

  static async updateProduct(id: string, data: Prisma.ProductUpdateInput) {
    const product = await prisma.product.findUnique({ where: { id } });
    if (!product) throw new AppError('Product not found', 404);

    const updatedData: Prisma.ProductUpdateInput = { ...data };
    if (data.name && typeof data.name === 'string' && data.name !== product.name) {
      updatedData.slug = await uniqueSlug(data.name, id);
    }
    // Back-fill slug if product doesn't have one yet
    if (!product.slug) {
      updatedData.slug = await uniqueSlug(product.name, id);
    }

    return prisma.product.update({ where: { id }, data: updatedData });
  }

  static async deleteProduct(id: string) {
    const product = await prisma.product.findUnique({ where: { id } });
    if (!product) throw new AppError('Product not found', 404);

    return prisma.$transaction(async (tx) => {
      await tx.orderItem.deleteMany({ where: { productId: id } });
      return tx.product.delete({ where: { id } });
    });
  }

  static async getProductById(idOrSlug: string) {
    // Support both UUID and slug lookup
    if (UUID_PATTERN.test(idOrSlug)) {
      const product = await prisma.product.findUnique({ where: { id: idOrSlug } });
      if (!product) throw new AppError('Product not found', 404);
      return product;
    }

    // Try slug
    const product = await prisma.product.findFirst({ where: { slug: idOrSlug } });
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
