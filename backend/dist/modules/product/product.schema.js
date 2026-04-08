"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteProductSchema = exports.getProductSchema = exports.updateProductSchema = exports.createProductSchema = void 0;
const zod_1 = require("zod");
exports.createProductSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string().min(1, 'Product name is required'),
        scientificName: zod_1.z.string().optional(),
        description: zod_1.z.string().min(1, 'Description is required'),
        ingredients: zod_1.z.string().optional(),
        price: zod_1.z.number().positive('Price must be greater than 0'),
        discountPrice: zod_1.z.number().positive().optional(),
        category: zod_1.z.string().min(1, 'Category is required'),
        inStock: zod_1.z.boolean().optional(),
        weight: zod_1.z.string().optional(),
        weightOptions: zod_1.z.array(zod_1.z.string()).optional(),
        imageUrl: zod_1.z.string().optional(),
        galleryImages: zod_1.z.array(zod_1.z.string()).optional(),
        stock: zod_1.z.number().int().nonnegative('Stock cannot be negative'),
    }),
});
exports.updateProductSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string().optional(),
        scientificName: zod_1.z.string().optional(),
        description: zod_1.z.string().optional(),
        ingredients: zod_1.z.string().optional(),
        price: zod_1.z.number().positive().optional(),
        discountPrice: zod_1.z.number().positive().optional(),
        category: zod_1.z.string().optional(),
        inStock: zod_1.z.boolean().optional(),
        weight: zod_1.z.string().optional(),
        weightOptions: zod_1.z.array(zod_1.z.string()).optional(),
        imageUrl: zod_1.z.string().optional(),
        galleryImages: zod_1.z.array(zod_1.z.string()).optional(),
        stock: zod_1.z.number().int().nonnegative().optional(),
    }),
    params: zod_1.z.object({
        id: zod_1.z.string().uuid('Invalid product ID'),
    }),
});
exports.getProductSchema = zod_1.z.object({
    params: zod_1.z.object({
        id: zod_1.z.string().uuid('Invalid product ID'),
    }),
});
exports.deleteProductSchema = exports.getProductSchema;
