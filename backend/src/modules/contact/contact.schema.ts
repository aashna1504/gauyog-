import { z } from 'zod';

const emptyToUndefined = z.preprocess((v) => (v === '' ? undefined : v), z.string().optional());

export const submitContactSchema = z.object({
  body: z.object({
    name: z.string().min(2, 'Name is required'),
    email: z.string().email('Valid email is required'),
    phone: emptyToUndefined,
    role: z.preprocess(
      (v) => (v === '' ? undefined : v),
      z.enum(['Farmer', 'Retailer', 'Consumer', 'Distributor', 'Exporter']).optional(),
    ),
    interest: emptyToUndefined,
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
