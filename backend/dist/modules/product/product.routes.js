"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const product_controller_1 = require("./product.controller");
const validate_middleware_1 = require("../../middleware/validate.middleware");
const auth_middleware_1 = require("../../middleware/auth.middleware");
const product_schema_1 = require("./product.schema");
const router = (0, express_1.Router)();
router.get('/', product_controller_1.getProducts);
router.get('/:id', (0, validate_middleware_1.validateRequest)(product_schema_1.getProductSchema), product_controller_1.getProduct);
// Protected Admin Routes
router.use(auth_middleware_1.authenticate, (0, auth_middleware_1.authorize)('ADMIN'));
router.post('/', (0, validate_middleware_1.validateRequest)(product_schema_1.createProductSchema), product_controller_1.createProduct);
router.patch('/:id', (0, validate_middleware_1.validateRequest)(product_schema_1.updateProductSchema), product_controller_1.updateProduct);
router.delete('/:id', (0, validate_middleware_1.validateRequest)(product_schema_1.deleteProductSchema), product_controller_1.deleteProduct);
exports.default = router;
