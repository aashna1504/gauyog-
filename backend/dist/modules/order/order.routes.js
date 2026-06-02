"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const order_controller_1 = require("./order.controller");
const auth_middleware_1 = require("../../middleware/auth.middleware");
const router = (0, express_1.Router)();
// User routes (authenticated)
router.post('/', auth_middleware_1.authenticate, order_controller_1.OrderController.createOrder);
router.get('/my', auth_middleware_1.authenticate, order_controller_1.OrderController.getUserOrders);
router.get('/my/:id', auth_middleware_1.authenticate, order_controller_1.OrderController.getOrderById);
// Admin routes
router.get('/', auth_middleware_1.authenticate, (0, auth_middleware_1.authorize)('ADMIN'), order_controller_1.OrderController.getAllOrders);
router.patch('/:id/status', auth_middleware_1.authenticate, (0, auth_middleware_1.authorize)('ADMIN'), order_controller_1.OrderController.updateOrderStatus);
router.patch('/:id/tracking', auth_middleware_1.authenticate, (0, auth_middleware_1.authorize)('ADMIN'), order_controller_1.OrderController.updateTrackingId);
router.get('/stats', auth_middleware_1.authenticate, (0, auth_middleware_1.authorize)('ADMIN'), order_controller_1.OrderController.getStats);
exports.default = router;
