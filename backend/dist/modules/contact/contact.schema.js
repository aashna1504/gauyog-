"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getContactsSchema = exports.submitContactSchema = void 0;
const zod_1 = require("zod");
const emptyToUndefined = zod_1.z.preprocess((v) => (v === '' ? undefined : v), zod_1.z.string().optional());
exports.submitContactSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string().min(2, 'Name is required'),
        email: zod_1.z.string().email('Valid email is required'),
        phone: zod_1.z.string().min(1, 'Mobile number is required'),
        village: emptyToUndefined,
        district: emptyToUndefined,
        state: emptyToUndefined,
        roles: zod_1.z.array(zod_1.z.string()).default([]),
        interests: zod_1.z.array(zod_1.z.string()).default([]),
        products: zod_1.z.array(zod_1.z.string()).default([]),
        message: zod_1.z.string().min(1, 'Message is required'),
    }),
});
exports.getContactsSchema = zod_1.z.object({
    query: zod_1.z.object({
        page: zod_1.z.string().optional(),
        limit: zod_1.z.string().optional(),
        search: zod_1.z.string().optional(),
    }).optional(),
});
