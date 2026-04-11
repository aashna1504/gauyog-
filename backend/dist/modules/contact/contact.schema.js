"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getContactsSchema = exports.submitContactSchema = void 0;
const zod_1 = require("zod");
exports.submitContactSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string().min(2, 'Name is required'),
        email: zod_1.z.string().email('Valid email is required'),
        phone: zod_1.z.string().optional(),
        message: zod_1.z.string().min(10, 'Message must be at least 10 characters'),
    }),
});
exports.getContactsSchema = zod_1.z.object({
    query: zod_1.z.object({
        page: zod_1.z.string().optional(),
        limit: zod_1.z.string().optional(),
        search: zod_1.z.string().optional(),
    }).optional(),
});
