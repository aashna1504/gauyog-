import { Router } from 'express';
import {
  getCart,
  addToCart,
  updateCartItem,
  removeCartItem,
  clearCart,
} from './cart.controller';
import { authenticate } from '../../middleware/auth.middleware';
import { validateRequest } from '../../middleware/validate.middleware';
import {
  addToCartSchema,
  updateCartItemSchema,
  deleteCartItemSchema,
} from './cart.schema';

const router = Router();

// All cart routes require authentication
router.use(authenticate);

router.get('/', getCart);
router.post('/', validateRequest(addToCartSchema), addToCart);
router.patch('/item/:id', validateRequest(updateCartItemSchema), updateCartItem);
router.delete('/item/:id', validateRequest(deleteCartItemSchema), removeCartItem);
router.delete('/clear', clearCart);

export default router;
