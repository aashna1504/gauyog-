import { z } from 'zod';

export const createProductSchema = z.object({
  body: z.object({
    name: z.string().min(1, 'Product name is required'),
    scientificName: z.string().optional(),
    description: z.string().min(1, 'Description is required'),
    ingredients: z.string().optional(),
    price: z.number().positive('Price must be greater than 0'),
    discountPrice: z.number().positive().optional(),
    category: z.string().min(1, 'Category is required'),
    inStock: z.boolean().optional(),
    weight: z.string().optional(),
    weightOptions: z.array(z.string()).optional(),
    imageUrl: z.preprocess((v) => (v === '' ? undefined : v), z.string().optional()),
    image1kg: z.preprocess((v) => (v === '' ? undefined : v), z.string().optional()),
    price1kg: z.number().positive().optional(),
    image3kg: z.preprocess((v) => (v === '' ? undefined : v), z.string().optional()),
    price3kg: z.number().positive().optional(),
    image5kg: z.preprocess((v) => (v === '' ? undefined : v), z.string().optional()),
    price5kg: z.number().positive().optional(),
    galleryImages: z.array(z.string()).optional(),
    benefits: z.array(z.string()).optional(),
    sku: z.preprocess((v) => (v === '' ? undefined : v), z.string().optional()),
    batchNo: z.preprocess((v) => (v === '' ? undefined : v), z.string().optional()),
    mfgDate: z.preprocess((v) => (v === '' ? undefined : v), z.string().optional()),
    bestBefore: z.preprocess((v) => (v === '' ? undefined : v), z.string().optional()),
    usageInstructions: z.preprocess((v) => (v === '' ? undefined : v), z.string().optional()),
    storageInstructions: z.preprocess((v) => (v === '' ? undefined : v), z.string().optional()),
    safetyInstructions: z.preprocess((v) => (v === '' ? undefined : v), z.string().optional()),
    stock: z.number().int().nonnegative('Stock cannot be negative'),
  }),
});

export const updateProductSchema = z.object({
  body: z.object({
    name: z.string().optional(),
    scientificName: z.string().optional(),
    description: z.string().optional(),
    ingredients: z.string().optional(),
    price: z.number().positive().optional(),
    discountPrice: z.number().positive().optional(),
    category: z.string().optional(),
    inStock: z.boolean().optional(),
    weight: z.preprocess((v) => (v === '' ? undefined : v), z.string().optional()),
    weightOptions: z.array(z.string()).optional(),
    imageUrl: z.preprocess((v) => (v === '' ? undefined : v), z.string().optional()),
    image1kg: z.preprocess((v) => (v === '' ? undefined : v), z.string().optional()),
    price1kg: z.number().positive().optional(),
    image3kg: z.preprocess((v) => (v === '' ? undefined : v), z.string().optional()),
    price3kg: z.number().positive().optional(),
    image5kg: z.preprocess((v) => (v === '' ? undefined : v), z.string().optional()),
    price5kg: z.number().positive().optional(),
    galleryImages: z.array(z.string()).optional(),
    benefits: z.array(z.string()).optional(),
    sku: z.preprocess((v) => (v === '' ? undefined : v), z.string().optional()),
    batchNo: z.preprocess((v) => (v === '' ? undefined : v), z.string().optional()),
    mfgDate: z.preprocess((v) => (v === '' ? undefined : v), z.string().optional()),
    bestBefore: z.preprocess((v) => (v === '' ? undefined : v), z.string().optional()),
    usageInstructions: z.preprocess((v) => (v === '' ? undefined : v), z.string().optional()),
    storageInstructions: z.preprocess((v) => (v === '' ? undefined : v), z.string().optional()),
    safetyInstructions: z.preprocess((v) => (v === '' ? undefined : v), z.string().optional()),
    stock: z.number().int().nonnegative().optional(),
  }),
  params: z.object({
    id: z.string().uuid('Invalid product ID'),
  }),
});

export const getProductSchema = z.object({
  params: z.object({
    id: z.string().uuid('Invalid product ID'),
  }),
});

export const deleteProductSchema = getProductSchema;
