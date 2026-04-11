import { Router } from 'express';
import { submitContact, getContacts } from './contact.controller';
import { validateRequest } from '../../middleware/validate.middleware';
import { submitContactSchema } from './contact.schema';
import { authenticate, authorize } from '../../middleware/auth.middleware';

const router = Router();

router.post('/', validateRequest(submitContactSchema), submitContact);
router.get('/', authenticate, authorize('ADMIN'), getContacts);

export default router;
