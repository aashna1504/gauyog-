import { z } from 'zod';

export const upsertDeliverySchema = z.object({
  body: z.object({
    firstName: z.string().max(100).optional(),
    lastName:  z.string().max(100).optional(),
    phone:     z.string().max(20).optional(),
    email:     z.string().email('Invalid email').optional(),
    building:  z.string().max(255).optional(),
    address:   z.string().max(500).optional(),
  }),
});
