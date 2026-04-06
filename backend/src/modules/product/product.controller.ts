import { Request, Response, NextFunction } from 'express';
import { ProductService } from './product.service';
import { formatResponse } from '../../utils/helpers';

export const createProduct = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const product = await ProductService.createProduct(req.body);
    res.status(201).json(formatResponse(true, 'Product created successfully', product));
  } catch (error) {
    next(error);
  }
};

export const updateProduct = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const product = await ProductService.updateProduct(req.params.id, req.body);
    res.status(200).json(formatResponse(true, 'Product updated successfully', product));
  } catch (error) {
    next(error);
  }
};

export const deleteProduct = async (req: Request, res: Response, next: NextFunction) => {
  try {
    await ProductService.deleteProduct(req.params.id);
    res.status(200).json(formatResponse(true, 'Product deleted successfully'));
  } catch (error) {
    next(error);
  }
};

export const getProduct = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const product = await ProductService.getProductById(req.params.id);
    res.status(200).json(formatResponse(true, 'Product retrieved successfully', product));
  } catch (error) {
    next(error);
  }
};

export const getProducts = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const search = req.query.search as string;

    const result = await ProductService.getAllProducts(page, limit, search);
    res.status(200).json(formatResponse(true, 'Products retrieved successfully', result));
  } catch (error) {
    next(error);
  }
};
