"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const blog_controller_1 = require("./blog.controller");
const validate_middleware_1 = require("../../middleware/validate.middleware");
const auth_middleware_1 = require("../../middleware/auth.middleware");
const blog_schema_1 = require("./blog.schema");
const router = (0, express_1.Router)();
// Admin listing must come before /:id so "admin" isn't treated as a slug
router.get('/admin/all', auth_middleware_1.authenticate, (0, auth_middleware_1.authorize)('ADMIN'), blog_controller_1.getAllBlogsAdmin);
// Public routes
router.get('/', blog_controller_1.getBlogs);
router.get('/:id', blog_controller_1.getBlog);
// Admin write routes
router.post('/', auth_middleware_1.authenticate, (0, auth_middleware_1.authorize)('ADMIN'), (0, validate_middleware_1.validateRequest)(blog_schema_1.createBlogSchema), blog_controller_1.createBlog);
router.patch('/:id', auth_middleware_1.authenticate, (0, auth_middleware_1.authorize)('ADMIN'), (0, validate_middleware_1.validateRequest)(blog_schema_1.updateBlogSchema), blog_controller_1.updateBlog);
router.delete('/:id', auth_middleware_1.authenticate, (0, auth_middleware_1.authorize)('ADMIN'), (0, validate_middleware_1.validateRequest)(blog_schema_1.deleteBlogSchema), blog_controller_1.deleteBlog);
exports.default = router;
