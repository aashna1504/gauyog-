"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlogService = void 0;
const db_1 = require("../../config/db");
const helpers_1 = require("../../utils/helpers");
function generateSlug(title) {
    return title
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-')
        .replace(/^-+|-+$/g, '');
}
async function uniqueSlug(title, excludeId) {
    const base = generateSlug(title);
    let slug = base;
    let counter = 1;
    while (true) {
        const existing = await db_1.prisma.blog.findFirst({
            where: { slug, ...(excludeId ? { id: { not: excludeId } } : {}) },
        });
        if (!existing)
            return slug;
        slug = `${base}-${counter++}`;
    }
}
const UUID_PATTERN = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
class BlogService {
    static async createBlog(data) {
        const slug = data.slug?.trim() || (await uniqueSlug(data.title));
        // Check slug uniqueness if admin provided one manually
        if (data.slug) {
            const existing = await db_1.prisma.blog.findFirst({ where: { slug } });
            if (existing)
                throw new helpers_1.AppError('A blog post with this slug already exists', 409);
        }
        return db_1.prisma.blog.create({
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
    static async updateBlog(id, data) {
        const blog = await db_1.prisma.blog.findUnique({ where: { id } });
        if (!blog)
            throw new helpers_1.AppError('Blog post not found', 404);
        const updateData = { ...data };
        // Auto-regen slug when title changes (unless admin explicitly set a new slug)
        if (data.title && data.title !== blog.title && !data.slug) {
            updateData.slug = await uniqueSlug(data.title, id);
        }
        return db_1.prisma.blog.update({ where: { id }, data: updateData });
    }
    static async deleteBlog(id) {
        const blog = await db_1.prisma.blog.findUnique({ where: { id } });
        if (!blog)
            throw new helpers_1.AppError('Blog post not found', 404);
        return db_1.prisma.blog.delete({ where: { id } });
    }
    static async getBlogByIdOrSlug(idOrSlug, adminView = false) {
        let blog;
        if (UUID_PATTERN.test(idOrSlug)) {
            blog = await db_1.prisma.blog.findUnique({ where: { id: idOrSlug } });
        }
        else {
            blog = await db_1.prisma.blog.findFirst({ where: { slug: idOrSlug } });
        }
        if (!blog)
            throw new helpers_1.AppError('Blog post not found', 404);
        if (!adminView && !blog.published)
            throw new helpers_1.AppError('Blog post not found', 404);
        return blog;
    }
    // Public listing — only published posts
    static async getPublishedBlogs(page = 1, limit = 20) {
        const skip = (page - 1) * limit;
        const where = { published: true };
        const [blogs, total] = await Promise.all([
            db_1.prisma.blog.findMany({
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
            db_1.prisma.blog.count({ where }),
        ]);
        return { blogs, meta: { total, page, limit, totalPages: Math.ceil(total / limit) } };
    }
    // Admin listing — all posts including drafts
    static async getAllBlogsAdmin(page = 1, limit = 50) {
        const skip = (page - 1) * limit;
        const [blogs, total] = await Promise.all([
            db_1.prisma.blog.findMany({
                skip,
                take: limit,
                orderBy: { createdAt: 'desc' },
                select: {
                    id: true, slug: true, title: true, category: true, author: true,
                    date: true, readTime: true, image: true, excerpt: true, tags: true,
                    published: true, createdAt: true, updatedAt: true,
                },
            }),
            db_1.prisma.blog.count(),
        ]);
        return { blogs, meta: { total, page, limit, totalPages: Math.ceil(total / limit) } };
    }
}
exports.BlogService = BlogService;
