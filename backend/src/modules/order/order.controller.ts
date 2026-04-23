import { Request, Response, NextFunction } from 'express';
import { OrderService } from './order.service';

export class OrderController {
  static async createOrder(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = req.user!.userId;
      const order = await OrderService.createOrder(userId, req.body);
      res.status(201).json({ status: 'success', data: order });
    } catch (error) {
      next(error);
    }
  }

  static async getUserOrders(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = req.user!.userId;
      const orders = await OrderService.getUserOrders(userId);
      res.status(200).json({ status: 'success', data: orders });
    } catch (error) {
      next(error);
    }
  }

  static async getOrderById(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = req.user!.userId;
      const order = await OrderService.getOrderById(req.params.id, userId);
      res.status(200).json({ status: 'success', data: order });
    } catch (error) {
      next(error);
    }
  }

  static async getAllOrders(req: Request, res: Response, next: NextFunction) {
    try {
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 20;
      const result = await OrderService.getAllOrders(page, limit);
      res.status(200).json({ status: 'success', data: result });
    } catch (error) {
      next(error);
    }
  }

  static async updateOrderStatus(req: Request, res: Response, next: NextFunction) {
    try {
      const order = await OrderService.updateOrderStatus(req.params.id, req.body.status);
      res.status(200).json({ status: 'success', data: order });
    } catch (error) {
      next(error);
    }
  }

  static async updateTrackingId(req: Request, res: Response, next: NextFunction) {
    try {
      const order = await OrderService.updateTrackingId(req.params.id, req.body.trackingId ?? '');
      res.status(200).json({ status: 'success', data: order });
    } catch (error) {
      next(error);
    }
  }

  static async getStats(_req: Request, res: Response, next: NextFunction) {
    try {
      const stats = await OrderService.getStats();
      res.status(200).json({ status: 'success', data: stats });
    } catch (error) {
      next(error);
    }
  }
}
