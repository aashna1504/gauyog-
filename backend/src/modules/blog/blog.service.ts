import { prisma } from '../../config/db';
import { AppError } from '../../utils/helpers';

function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-+|-+$/g, '');
}

async function uniqueSlug(title: string, excludeId?: string): Promise<string> {
  const base = generateSlug(title);
  let slug = base;
  let counter = 1;
  while (true) {
    const existing = await prisma.blog.findFirst({
      where: { slug, ...(excludeId ? { id: { not: excludeId } } : {}) },
    });
    if (!existing) return slug;
    slug = `${base}-${counter++}`;
  }
}

const UUID_PATTERN = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

export class BlogService {
  static async createBlog(data: any) {
    const slug = data.slug?.trim() || (await uniqueSlug(data.title));
    // Check slug uniqueness if admin provided one manually
    if (data.slug) {
      const existing = await prisma.blog.findFirst({ where: { slug } });
      if (existing) throw new AppError('A blog post with this slug already exists', 409);
    }
    return prisma.blog.create({
      data: {
        slug,
        title: data.title,
        metaDescription: data.metaDescription,
        category: data.category,
        author: data.author ?? 'Gauyog Kendr',
        date: data.date,
        readTime: data.readTime ?? '5 min read',
        image: data.image,
        excerpt: data.excerpt,
        content: data.content ?? [],
        tags: data.tags ?? [],
        faq: data.faq ?? [],
        published: data.published ?? true,
      },
    });
  }

  static async updateBlog(id: string, data: any) {
    const blog = await prisma.blog.findUnique({ where: { id } });
    if (!blog) throw new AppError('Blog post not found', 404);

    const updateData: any = { ...data };

    // Auto-regen slug when title changes (unless admin explicitly set a new slug)
    if (data.title && data.title !== blog.title && !data.slug) {
      updateData.slug = await uniqueSlug(data.title, id);
    }

    return prisma.blog.update({ where: { id }, data: updateData });
  }

  static async deleteBlog(id: string) {
    const blog = await prisma.blog.findUnique({ where: { id } });
    if (!blog) throw new AppError('Blog post not found', 404);
    return prisma.blog.delete({ where: { id } });
  }

  static async getBlogByIdOrSlug(idOrSlug: string, adminView = false) {
    let blog;
    if (UUID_PATTERN.test(idOrSlug)) {
      blog = await prisma.blog.findUnique({ where: { id: idOrSlug } });
    } else {
      blog = await prisma.blog.findFirst({ where: { slug: idOrSlug } });
    }
    if (!blog) throw new AppError('Blog post not found', 404);
    if (!adminView && !blog.published) throw new AppError('Blog post not found', 404);
    return blog;
  }

  // Public listing — only published posts
  static async getPublishedBlogs(page = 1, limit = 20) {
    const skip = (page - 1) * limit;
    const where = { published: true };
    const [blogs, total] = await Promise.all([
      prisma.blog.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
        select: {
          id: true, slug: true, title: true, metaDescription: true,
          category: true, author: true, date: true, readTime: true,
          image: true, excerpt: true, tags: true, published: true,
          createdAt: true,
        },
      }),
      prisma.blog.count({ where }),
    ]);
    return { blogs, meta: { total, page, limit, totalPages: Math.ceil(total / limit) } };
  }

  // Admin listing — all posts including drafts
  static async getAllBlogsAdmin(page = 1, limit = 50) {
    const skip = (page - 1) * limit;
    const [blogs, total] = await Promise.all([
      prisma.blog.findMany({
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
        select: {
          id: true, slug: true, title: true, category: true, author: true,
          date: true, readTime: true, image: true, excerpt: true, tags: true,
          published: true, createdAt: true, updatedAt: true,
        },
      }),
      prisma.blog.count(),
    ]);
    return { blogs, meta: { total, page, limit, totalPages: Math.ceil(total / limit) } };
  }
}
