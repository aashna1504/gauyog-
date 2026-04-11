import { Router } from 'express';
import { getUsers, getUser, updateUser, deleteUser, getUserStats } from './user.controller';
import { validateRequest } from '../../middleware/validate.middleware';
import { authenticate, authorize } from '../../middleware/auth.middleware';
import { getUserSchema, updateUserSchema, deleteUserSchema, getUsersSchema } from './user.schema';

const router = Router();

// All user management routes require admin auth
router.use(authenticate, authorize('ADMIN'));

router.get('/', validateRequest(getUsersSchema), getUsers);
router.get('/stats', getUserStats);
router.get('/:id', validateRequest(getUserSchema), getUser);
router.patch('/:id', validateRequest(updateUserSchema), updateUser);
router.delete('/:id', validateRequest(deleteUserSchema), deleteUser);

export default router;
