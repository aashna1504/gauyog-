import { Router } from 'express';
import { signup, login, logout, refresh } from './auth.controller';
import { validateRequest } from '../../middleware/validate.middleware';
import { authenticate } from '../../middleware/auth.middleware';
import { signupSchema, loginSchema, refreshSchema } from './auth.schema';

const router = Router();

router.post('/signup', validateRequest(signupSchema), signup);
router.post('/login', validateRequest(loginSchema), login);
router.post('/logout', authenticate, logout);
router.post('/refresh', validateRequest(refreshSchema), refresh);

export default router;
