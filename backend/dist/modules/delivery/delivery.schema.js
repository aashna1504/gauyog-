"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.upsertDeliverySchema = void 0;
const zod_1 = require("zod");
exports.upsertDeliverySchema = zod_1.z.object({
    body: zod_1.z.object({
        firstName: zod_1.z.string().max(100).optional(),
        lastName: zod_1.z.string().max(100).optional(),
        phone: zod_1.z.string().max(20).optional(),
        email: zod_1.z.string().email('Invalid email').optional(),
        building: zod_1.z.string().max(255).optional(),
        address: zod_1.z.string().max(500).optional(),
    }),
});
