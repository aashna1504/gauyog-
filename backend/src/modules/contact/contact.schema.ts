import { z } from 'zod';

const emptyToUndefined = z.preprocess((v) => (v === '' ? undefined : v), z.string().optional());

export const submitContactSchema = z.object({
  body: z.object({
    name: z.string().min(2, 'Name is required'),
    email: z.string().email('Valid email is required'),
    phone: z.string().min(1, 'Mobile number is required'),
    village: emptyToUndefined,
    district: emptyToUndefined,
    state: emptyToUndefined,
    roles: z.array(z.string()).default([]),
    interests: z.array(z.string()).default([]),
    products: z.array(z.string()).default([]),
    message: z.string().min(1, 'Message is required'),
  }),
});

export const getContactsSchema = z.object({
  query: z.object({
    page: z.string().optional(),
    limit: z.string().optional(),
    search: z.string().optional(),
  }).optional(),
});
