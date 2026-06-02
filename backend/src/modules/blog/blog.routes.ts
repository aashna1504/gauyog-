import { Router } from 'express';
import {
  createBlog,
  updateBlog,
  deleteBlog,
  getBlog,
  getBlogs,
  getAllBlogsAdmin,
} from './blog.controller';
import { validateRequest } from '../../middleware/validate.middleware';
import { authenticate, authorize } from '../../middleware/auth.middleware';
import { createBlogSchema, updateBlogSchema, deleteBlogSchema } from './blog.schema';

const router = Router();

// Admin listing must come before /:id so "admin" isn't treated as a slug
router.get('/admin/all', authenticate, authorize('ADMIN'), getAllBlogsAdmin);

// Public routes
router.get('/', getBlogs);
router.get('/:id', getBlog);

// Admin write routes
router.post('/', authenticate, authorize('ADMIN'), validateRequest(createBlogSchema), createBlog);
router.patch('/:id', authenticate, authorize('ADMIN'), validateRequest(updateBlogSchema), updateBlog);
router.delete('/:id', authenticate, authorize('ADMIN'), validateRequest(deleteBlogSchema), deleteBlog);

export default router;
