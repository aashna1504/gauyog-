"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const cart_controller_1 = require("./cart.controller");
const auth_middleware_1 = require("../../middleware/auth.middleware");
const validate_middleware_1 = require("../../middleware/validate.middleware");
const cart_schema_1 = require("./cart.schema");
const router = (0, express_1.Router)();
// All cart routes require authentication
router.use(auth_middleware_1.authenticate);
router.get('/', cart_controller_1.getCart);
router.post('/', (0, validate_middleware_1.validateRequest)(cart_schema_1.addToCartSchema), cart_controller_1.addToCart);
router.patch('/item/:id', (0, validate_middleware_1.validateRequest)(cart_schema_1.updateCartItemSchema), cart_controller_1.updateCartItem);
router.delete('/item/:id', (0, validate_middleware_1.validateRequest)(cart_schema_1.deleteCartItemSchema), cart_controller_1.removeCartItem);
router.delete('/clear', cart_controller_1.clearCart);
exports.default = router;
