import { Router } from 'express';
import {
  createProduct,
  updateProduct,
  deleteProduct,
  getProduct,
  getProducts,
} from './product.controller';
import { validateRequest } from '../../middleware/validate.middleware';
import { authenticate, authorize } from '../../middleware/auth.middleware';
import {
  createProductSchema,
  updateProductSchema,
  getProductSchema,
  deleteProductSchema,
} from './product.schema';

const router = Router();

router.get('/', getProducts);
router.get('/:id', validateRequest(getProductSchema), getProduct);

// Protected Admin Routes
router.use(authenticate, authorize('ADMIN'));

router.post('/', validateRequest(createProductSchema), createProduct);
router.patch('/:id', validateRequest(updateProductSchema), updateProduct);
router.delete('/:id', validateRequest(deleteProductSchema), deleteProduct);

export default router;
