import { Router } from 'express';
import {
  signup,
  login,
  logout,
  refresh,
  googleAuth,
  forgotPassword,
  resetPassword,
  getProfile,
  updateProfile,
} from './auth.controller';
import { validateRequest } from '../../middleware/validate.middleware';
import { authenticate } from '../../middleware/auth.middleware';
import {
  signupSchema,
  loginSchema,
  refreshSchema,
  googleAuthSchema,
  forgotPasswordSchema,
  resetPasswordSchema,
} from './auth.schema';

const router = Router();

router.post('/signup', validateRequest(signupSchema), signup);
router.post('/login', validateRequest(loginSchema), login);
router.post('/google', validateRequest(googleAuthSchema), googleAuth);
router.post('/forgot-password', validateRequest(forgotPasswordSchema), forgotPassword);
router.post('/reset-password', validateRequest(resetPasswordSchema), resetPassword);
router.post('/logout', authenticate, logout);
router.post('/refresh', validateRequest(refreshSchema), refresh);
router.get('/me', authenticate, getProfile);
router.patch('/profile', authenticate, updateProfile);

export default router;
