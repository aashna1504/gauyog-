import { Request, Response, NextFunction } from 'express';
import { WishlistService } from './wishlist.service';
import { formatResponse } from '../../utils/helpers';

export const getWishlist = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const items = await WishlistService.getWishlist(req.user!.userId);
    res.status(200).json(formatResponse(true, 'Wishlist retrieved successfully', items));
  } catch (error) {
    next(error);
  }
};

export const addToWishlist = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { productId } = req.body;
    const item = await WishlistService.addToWishlist(req.user!.userId, productId);
    res.status(201).json(formatResponse(true, 'Added to wishlist', item));
  } catch (error) {
    next(error);
  }
};

export const removeFromWishlist = async (req: Request, res: Response, next: NextFunction) => {
  try {
    await WishlistService.removeFromWishlist(req.user!.userId, req.params.productId);
    res.status(200).json(formatResponse(true, 'Removed from wishlist'));
  } catch (error) {
    next(error);
  }
};
