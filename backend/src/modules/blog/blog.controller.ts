import { Request, Response, NextFunction } from 'express';
import { BlogService } from './blog.service';
import { formatResponse } from '../../utils/helpers';

export const createBlog = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const blog = await BlogService.createBlog(req.body);
    res.status(201).json(formatResponse(true, 'Blog post created successfully', blog));
  } catch (error) {
    next(error);
  }
};

export const updateBlog = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const blog = await BlogService.updateBlog(req.params.id, req.body);
    res.status(200).json(formatResponse(true, 'Blog post updated successfully', blog));
  } catch (error) {
    next(error);
  }
};

export const deleteBlog = async (req: Request, res: Response, next: NextFunction) => {
  try {
    await BlogService.deleteBlog(req.params.id);
    res.status(200).json(formatResponse(true, 'Blog post deleted successfully'));
  } catch (error) {
    next(error);
  }
};

export const getBlog = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const blog = await BlogService.getBlogByIdOrSlug(req.params.id);
    res.status(200).json(formatResponse(true, 'Blog post retrieved successfully', blog));
  } catch (error) {
    next(error);
  }
};

export const getBlogs = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 20;
    const result = await BlogService.getPublishedBlogs(page, limit);
    res.status(200).json(formatResponse(true, 'Blog posts retrieved successfully', result));
  } catch (error) {
    next(error);
  }
};

export const getAllBlogsAdmin = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 50;
    const result = await BlogService.getAllBlogsAdmin(page, limit);
    res.status(200).json(formatResponse(true, 'All blog posts retrieved', result));
  } catch (error) {
    next(error);
  }
};
