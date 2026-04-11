"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteCartItemSchema = exports.updateCartItemSchema = exports.addToCartSchema = void 0;
const zod_1 = require("zod");
exports.addToCartSchema = zod_1.z.object({
    body: zod_1.z.object({
        productId: zod_1.z.string().uuid('Invalid product ID'),
        quantity: zod_1.z.number().int().positive('Quantity must be at least 1').default(1),
    }),
});
exports.updateCartItemSchema = zod_1.z.object({
    params: zod_1.z.object({
        id: zod_1.z.string().uuid('Invalid item ID'),
    }),
    body: zod_1.z.object({
        quantity: zod_1.z.number().int().positive('Quantity must be at least 1'),
    }),
});
exports.deleteCartItemSchema = zod_1.z.object({
    params: zod_1.z.object({
        id: zod_1.z.string().uuid('Invalid item ID'),
    }),
});
