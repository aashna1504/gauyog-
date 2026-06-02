import { z } from 'zod';

const contentBlockSchema = z.union([
  z.object({
    type: z.enum(['intro', 'text', 'conclusion']),
    text: z.string(),
  }),
  z.object({
    type: z.literal('heading'),
    text: z.string(),
  }),
  z.object({
    type: z.literal('list'),
    items: z.array(z.string()),
    text: z.string().optional(),
  }),
]);

const faqItemSchema = z.object({
  question: z.string().min(1),
  answer: z.string().min(1),
});

export const createBlogSchema = z.object({
  body: z.object({
    title: z.string().min(1, 'Title is required'),
    slug: z.preprocess((v) => (v === '' ? undefined : v), z.string().optional()),
    metaDescription: z.preprocess((v) => (v === '' ? undefined : v), z.string().optional()),
    category: z.string().min(1, 'Category is required'),
    author: z.string().optional(),
    date: z.string().min(1, 'Date is required'),
    readTime: z.string().optional(),
    image: z.preprocess((v) => (v === '' ? undefined : v), z.string().optional()),
    excerpt: z.string().min(1, 'Excerpt is required'),
    content: z.array(contentBlockSchema).optional(),
    tags: z.array(z.string()).optional(),
    faq: z.array(faqItemSchema).optional(),
    published: z.boolean().optional(),
  }),
});

export const updateBlogSchema = z.object({
  body: z.object({
    title: z.string().optional(),
    slug: z.preprocess((v) => (v === '' ? undefined : v), z.string().optional()),
    metaDescription: z.preprocess((v) => (v === '' ? undefined : v), z.string().optional()),
    category: z.string().optional(),
    author: z.string().optional(),
    date: z.string().optional(),
    readTime: z.string().optional(),
    image: z.preprocess((v) => (v === '' ? null : v), z.string().nullable().optional()),
    excerpt: z.string().optional(),
    content: z.array(contentBlockSchema).optional(),
    tags: z.array(z.string()).optional(),
    faq: z.array(faqItemSchema).optional(),
    published: z.boolean().optional(),
  }),
  params: z.object({
    id: z.string().uuid('Invalid blog post ID'),
  }),
});

export const deleteBlogSchema = z.object({
  params: z.object({
    id: z.string().uuid('Invalid blog post ID'),
  }),
});
