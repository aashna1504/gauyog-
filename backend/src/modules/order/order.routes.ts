import { Router } from 'express';
import { OrderController } from './order.controller';
import { authenticate, authorize } from '../../middleware/auth.middleware';

const router = Router();

// User routes (authenticated)
router.post('/', authenticate, OrderController.createOrder);
router.get('/my', authenticate, OrderController.getUserOrders);
router.get('/my/:id', authenticate, OrderController.getOrderById);

// Admin routes
router.get('/', authenticate, authorize('ADMIN'), OrderController.getAllOrders);
router.patch('/:id/status', authenticate, authorize('ADMIN'), OrderController.updateOrderStatus);
router.patch('/:id/tracking', authenticate, authorize('ADMIN'), OrderController.updateTrackingId);
router.get('/stats', authenticate, authorize('ADMIN'), OrderController.getStats);

export default router;
