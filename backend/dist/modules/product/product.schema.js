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
        imageUrl: zod_1.z.preprocess((v) => (v === '' ? undefined : v), zod_1.z.string().optional()),
        image1kg: zod_1.z.preprocess((v) => (v === '' ? undefined : v), zod_1.z.string().optional()),
        price1kg: zod_1.z.number().positive().optional(),
        image3kg: zod_1.z.preprocess((v) => (v === '' ? undefined : v), zod_1.z.string().optional()),
        price3kg: zod_1.z.number().positive().optional(),
        image5kg: zod_1.z.preprocess((v) => (v === '' ? undefined : v), zod_1.z.string().optional()),
        price5kg: zod_1.z.number().positive().optional(),
        galleryImages: zod_1.z.array(zod_1.z.string()).optional(),
        benefits: zod_1.z.array(zod_1.z.string()).optional(),
        sku: zod_1.z.preprocess((v) => (v === '' ? undefined : v), zod_1.z.string().optional()),
        batchNo: zod_1.z.preprocess((v) => (v === '' ? undefined : v), zod_1.z.string().optional()),
        mfgDate: zod_1.z.preprocess((v) => (v === '' ? undefined : v), zod_1.z.string().optional()),
        bestBefore: zod_1.z.preprocess((v) => (v === '' ? undefined : v), zod_1.z.string().optional()),
        usageInstructions: zod_1.z.preprocess((v) => (v === '' ? undefined : v), zod_1.z.string().optional()),
        storageInstructions: zod_1.z.preprocess((v) => (v === '' ? undefined : v), zod_1.z.string().optional()),
        safetyInstructions: zod_1.z.preprocess((v) => (v === '' ? undefined : v), zod_1.z.string().optional()),
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
        weight: zod_1.z.preprocess((v) => (v === '' ? undefined : v), zod_1.z.string().optional()),
        weightOptions: zod_1.z.array(zod_1.z.string()).optional(),
        imageUrl: zod_1.z.preprocess((v) => (v === '' ? null : v), zod_1.z.string().nullable().optional()),
        image1kg: zod_1.z.preprocess((v) => (v === '' ? null : v), zod_1.z.string().nullable().optional()),
        price1kg: zod_1.z.number().positive().optional(),
        image3kg: zod_1.z.preprocess((v) => (v === '' ? null : v), zod_1.z.string().nullable().optional()),
        price3kg: zod_1.z.number().positive().optional(),
        image5kg: zod_1.z.preprocess((v) => (v === '' ? null : v), zod_1.z.string().nullable().optional()),
        price5kg: zod_1.z.number().positive().optional(),
        galleryImages: zod_1.z.array(zod_1.z.string()).optional(),
        benefits: zod_1.z.array(zod_1.z.string()).optional(),
        sku: zod_1.z.preprocess((v) => (v === '' ? undefined : v), zod_1.z.string().optional()),
        batchNo: zod_1.z.preprocess((v) => (v === '' ? undefined : v), zod_1.z.string().optional()),
        mfgDate: zod_1.z.preprocess((v) => (v === '' ? undefined : v), zod_1.z.string().optional()),
        bestBefore: zod_1.z.preprocess((v) => (v === '' ? undefined : v), zod_1.z.string().optional()),
        usageInstructions: zod_1.z.preprocess((v) => (v === '' ? undefined : v), zod_1.z.string().optional()),
        storageInstructions: zod_1.z.preprocess((v) => (v === '' ? undefined : v), zod_1.z.string().optional()),
        safetyInstructions: zod_1.z.preprocess((v) => (v === '' ? undefined : v), zod_1.z.string().optional()),
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
