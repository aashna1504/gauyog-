import { z } from 'zod';

export const getUserSchema = z.object({
  params: z.object({
    id: z.string().uuid('Invalid user ID'),
  }),
});

export const updateUserSchema = z.object({
  params: z.object({
    id: z.string().uuid('Invalid user ID'),
  }),
  body: z.object({
    name: z.string().min(1).optional(),
    email: z.string().email('Invalid email').optional(),
    role: z.enum(['USER', 'ADMIN', 'SALES']).optional(),
  }),
});

export const deleteUserSchema = getUserSchema;

export const getUsersSchema = z.object({
  query: z.object({
    page: z.string().optional(),
    limit: z.string().optional(),
    search: z.string().optional(),
  }),
});
