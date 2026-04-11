"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getProducts = exports.getProduct = exports.deleteProduct = exports.updateProduct = exports.createProduct = void 0;
const product_service_1 = require("./product.service");
const helpers_1 = require("../../utils/helpers");
const createProduct = async (req, res, next) => {
    try {
        const product = await product_service_1.ProductService.createProduct(req.body);
        res.status(201).json((0, helpers_1.formatResponse)(true, 'Product created successfully', product));
    }
    catch (error) {
        next(error);
    }
};
exports.createProduct = createProduct;
const updateProduct = async (req, res, next) => {
    try {
        const product = await product_service_1.ProductService.updateProduct(req.params.id, req.body);
        res.status(200).json((0, helpers_1.formatResponse)(true, 'Product updated successfully', product));
    }
    catch (error) {
        next(error);
    }
};
exports.updateProduct = updateProduct;
const deleteProduct = async (req, res, next) => {
    try {
        await product_service_1.ProductService.deleteProduct(req.params.id);
        res.status(200).json((0, helpers_1.formatResponse)(true, 'Product deleted successfully'));
    }
    catch (error) {
        next(error);
    }
};
exports.deleteProduct = deleteProduct;
const getProduct = async (req, res, next) => {
    try {
        const product = await product_service_1.ProductService.getProductById(req.params.id);
        res.status(200).json((0, helpers_1.formatResponse)(true, 'Product retrieved successfully', product));
    }
    catch (error) {
        next(error);
    }
};
exports.getProduct = getProduct;
const getProducts = async (req, res, next) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const search = req.query.search;
        const result = await product_service_1.ProductService.getAllProducts(page, limit, search);
        res.status(200).json((0, helpers_1.formatResponse)(true, 'Products retrieved successfully', result));
    }
    catch (error) {
        next(error);
    }
};
exports.getProducts = getProducts;
