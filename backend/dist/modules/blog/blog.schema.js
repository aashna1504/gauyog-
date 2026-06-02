"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteBlogSchema = exports.updateBlogSchema = exports.createBlogSchema = void 0;
const zod_1 = require("zod");
const contentBlockSchema = zod_1.z.union([
    zod_1.z.object({
        type: zod_1.z.enum(['intro', 'text', 'conclusion']),
        text: zod_1.z.string(),
    }),
    zod_1.z.object({
        type: zod_1.z.literal('heading'),
        text: zod_1.z.string(),
    }),
    zod_1.z.object({
        type: zod_1.z.literal('list'),
        items: zod_1.z.array(zod_1.z.string()),
        text: zod_1.z.string().optional(),
    }),
]);
const faqItemSchema = zod_1.z.object({
    question: zod_1.z.string().min(1),
    answer: zod_1.z.string().min(1),
});
exports.createBlogSchema = zod_1.z.object({
    body: zod_1.z.object({
        title: zod_1.z.string().min(1, 'Title is required'),
        slug: zod_1.z.preprocess((v) => (v === '' ? undefined : v), zod_1.z.string().optional()),
        metaDescription: zod_1.z.preprocess((v) => (v === '' ? undefined : v), zod_1.z.string().optional()),
        category: zod_1.z.string().min(1, 'Category is required'),
        author: zod_1.z.string().optional(),
        date: zod_1.z.string().min(1, 'Date is required'),
        readTime: zod_1.z.string().optional(),
        image: zod_1.z.preprocess((v) => (v === '' ? undefined : v), zod_1.z.string().optional()),
        excerpt: zod_1.z.string().min(1, 'Excerpt is required'),
        content: zod_1.z.array(contentBlockSchema).optional(),
        tags: zod_1.z.array(zod_1.z.string()).optional(),
        faq: zod_1.z.array(faqItemSchema).optional(),
        published: zod_1.z.boolean().optional(),
    }),
});
exports.updateBlogSchema = zod_1.z.object({
    body: zod_1.z.object({
        title: zod_1.z.string().optional(),
        slug: zod_1.z.preprocess((v) => (v === '' ? undefined : v), zod_1.z.string().optional()),
        metaDescription: zod_1.z.preprocess((v) => (v === '' ? undefined : v), zod_1.z.string().optional()),
        category: zod_1.z.string().optional(),
        author: zod_1.z.string().optional(),
        date: zod_1.z.string().optional(),
        readTime: zod_1.z.string().optional(),
        image: zod_1.z.preprocess((v) => (v === '' ? null : v), zod_1.z.string().nullable().optional()),
        excerpt: zod_1.z.string().optional(),
        content: zod_1.z.array(contentBlockSchema).optional(),
        tags: zod_1.z.array(zod_1.z.string()).optional(),
        faq: zod_1.z.array(faqItemSchema).optional(),
        published: zod_1.z.boolean().optional(),
    }),
    params: zod_1.z.object({
        id: zod_1.z.string().uuid('Invalid blog post ID'),
    }),
});
exports.deleteBlogSchema = zod_1.z.object({
    params: zod_1.z.object({
        id: zod_1.z.string().uuid('Invalid blog post ID'),
    }),
});
