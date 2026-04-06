import { z } from 'zod';

export const createProductSchema = z.object({
  body: z.object({
    name: z.string().min(1, 'Product name is required'),
    description: z.string().min(1, 'Description is required'),
    price: z.number().positive('Price must be greater than 0'),
    stock: z.number().int().nonnegative('Stock cannot be negative'),
  }),
});

export const updateProductSchema = z.object({
  body: z.object({
    name: z.string().optional(),
    description: z.string().optional(),
    price: z.number().positive().optional(),
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
