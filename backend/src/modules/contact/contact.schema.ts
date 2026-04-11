import { z } from 'zod';

export const submitContactSchema = z.object({
  body: z.object({
    name: z.string().min(2, 'Name is required'),
    email: z.string().email('Valid email is required'),
    phone: z.string().optional(),
    role: z.enum(['Farmer', 'Retailer', 'Consumer', 'Distributor', 'Exporter']).optional(),
    message: z.string().min(10, 'Message must be at least 10 characters'),
  }),
});

export const getContactsSchema = z.object({
  query: z.object({
    page: z.string().optional(),
    limit: z.string().optional(),
    search: z.string().optional(),
  }).optional(),
});
