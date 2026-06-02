"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderController = void 0;
const order_service_1 = require("./order.service");
class OrderController {
    static async createOrder(req, res, next) {
        try {
            const userId = req.user.userId;
            const order = await order_service_1.OrderService.createOrder(userId, req.body);
            res.status(201).json({ status: 'success', data: order });
        }
        catch (error) {
            next(error);
        }
    }
    static async getUserOrders(req, res, next) {
        try {
            const userId = req.user.userId;
            const orders = await order_service_1.OrderService.getUserOrders(userId);
            res.status(200).json({ status: 'success', data: orders });
        }
        catch (error) {
            next(error);
        }
    }
    static async getOrderById(req, res, next) {
        try {
            const userId = req.user.userId;
            const order = await order_service_1.OrderService.getOrderById(req.params.id, userId);
            res.status(200).json({ status: 'success', data: order });
        }
        catch (error) {
            next(error);
        }
    }
    static async getAllOrders(req, res, next) {
        try {
            const page = parseInt(req.query.page) || 1;
            const limit = parseInt(req.query.limit) || 20;
            const result = await order_service_1.OrderService.getAllOrders(page, limit);
            res.status(200).json({ status: 'success', data: result });
        }
        catch (error) {
            next(error);
        }
    }
    static async updateOrderStatus(req, res, next) {
        try {
            const order = await order_service_1.OrderService.updateOrderStatus(req.params.id, req.body.status);
            res.status(200).json({ status: 'success', data: order });
        }
        catch (error) {
            next(error);
        }
    }
    static async updateTrackingId(req, res, next) {
        try {
            const order = await order_service_1.OrderService.updateTrackingId(req.params.id, req.body.trackingId ?? '');
            res.status(200).json({ status: 'success', data: order });
        }
        catch (error) {
            next(error);
        }
    }
    static async getStats(_req, res, next) {
        try {
            const stats = await order_service_1.OrderService.getStats();
            res.status(200).json({ status: 'success', data: stats });
        }
        catch (error) {
            next(error);
        }
    }
}
exports.OrderController = OrderController;
