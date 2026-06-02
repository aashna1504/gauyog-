"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllBlogsAdmin = exports.getBlogs = exports.getBlog = exports.deleteBlog = exports.updateBlog = exports.createBlog = void 0;
const blog_service_1 = require("./blog.service");
const helpers_1 = require("../../utils/helpers");
const createBlog = async (req, res, next) => {
    try {
        const blog = await blog_service_1.BlogService.createBlog(req.body);
        res.status(201).json((0, helpers_1.formatResponse)(true, 'Blog post created successfully', blog));
    }
    catch (error) {
        next(error);
    }
};
exports.createBlog = createBlog;
const updateBlog = async (req, res, next) => {
    try {
        const blog = await blog_service_1.BlogService.updateBlog(req.params.id, req.body);
        res.status(200).json((0, helpers_1.formatResponse)(true, 'Blog post updated successfully', blog));
    }
    catch (error) {
        next(error);
    }
};
exports.updateBlog = updateBlog;
const deleteBlog = async (req, res, next) => {
    try {
        await blog_service_1.BlogService.deleteBlog(req.params.id);
        res.status(200).json((0, helpers_1.formatResponse)(true, 'Blog post deleted successfully'));
    }
    catch (error) {
        next(error);
    }
};
exports.deleteBlog = deleteBlog;
const getBlog = async (req, res, next) => {
    try {
        const blog = await blog_service_1.BlogService.getBlogByIdOrSlug(req.params.id);
        res.status(200).json((0, helpers_1.formatResponse)(true, 'Blog post retrieved successfully', blog));
    }
    catch (error) {
        next(error);
    }
};
exports.getBlog = getBlog;
const getBlogs = async (req, res, next) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 20;
        const result = await blog_service_1.BlogService.getPublishedBlogs(page, limit);
        res.status(200).json((0, helpers_1.formatResponse)(true, 'Blog posts retrieved successfully', result));
    }
    catch (error) {
        next(error);
    }
};
exports.getBlogs = getBlogs;
const getAllBlogsAdmin = async (req, res, next) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 50;
        const result = await blog_service_1.BlogService.getAllBlogsAdmin(page, limit);
        res.status(200).json((0, helpers_1.formatResponse)(true, 'All blog posts retrieved', result));
    }
    catch (error) {
        next(error);
    }
};
exports.getAllBlogsAdmin = getAllBlogsAdmin;
