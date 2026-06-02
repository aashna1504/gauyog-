"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUsersSchema = exports.deleteUserSchema = exports.updateUserSchema = exports.getUserSchema = void 0;
const zod_1 = require("zod");
exports.getUserSchema = zod_1.z.object({
    params: zod_1.z.object({
        id: zod_1.z.string().uuid('Invalid user ID'),
    }),
});
exports.updateUserSchema = zod_1.z.object({
    params: zod_1.z.object({
        id: zod_1.z.string().uuid('Invalid user ID'),
    }),
    body: zod_1.z.object({
        name: zod_1.z.string().min(1).optional(),
        email: zod_1.z.string().email('Invalid email').optional(),
        role: zod_1.z.enum(['USER', 'ADMIN', 'SALES']).optional(),
    }),
});
exports.deleteUserSchema = exports.getUserSchema;
exports.getUsersSchema = zod_1.z.object({
    query: zod_1.z.object({
        page: zod_1.z.string().optional(),
        limit: zod_1.z.string().optional(),
        search: zod_1.z.string().optional(),
    }),
});
