import { Router } from 'express';
import { getDeliveryDetails, upsertDeliveryDetails } from './delivery.controller';
import { authenticate } from '../../middleware/auth.middleware';
import { validateRequest } from '../../middleware/validate.middleware';
import { upsertDeliverySchema } from './delivery.schema';

const router = Router();

router.use(authenticate);

router.get('/', getDeliveryDetails);
router.put('/', validateRequest(upsertDeliverySchema), upsertDeliveryDetails);

export default router;
