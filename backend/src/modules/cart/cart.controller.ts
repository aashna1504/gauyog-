import { Request, Response, NextFunction } from 'express';
import { CartService } from './cart.service';
import { formatResponse } from '../../utils/helpers';

export const getCart = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const cart = await CartService.getCart(req.user!.userId);
    res.status(200).json(formatResponse(true, 'Cart retrieved successfully', cart));
  } catch (error) {
    next(error);
  }
};

export const addToCart = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { productId, quantity } = req.body;
    const item = await CartService.addToCart(req.user!.userId, productId, quantity);
    res.status(201).json(formatResponse(true, 'Item added to cart successfully', item));
  } catch (error) {
    next(error);
  }
};

export const updateCartItem = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { quantity } = req.body;
    const item = await CartService.updateCartItemQuantity(req.user!.userId, req.params.id, quantity);
    res.status(200).json(formatResponse(true, 'Cart item updated successfully', item));
  } catch (error) {
    next(error);
  }
};

export const removeCartItem = async (req: Request, res: Response, next: NextFunction) => {
  try {
    await CartService.removeCartItem(req.user!.userId, req.params.id);
    res.status(200).json(formatResponse(true, 'Item removed from cart successfully'));
  } catch (error) {
    next(error);
  }
};

export const clearCart = async (req: Request, res: Response, next: NextFunction) => {
  try {
    await CartService.clearCart(req.user!.userId);
    res.status(200).json(formatResponse(true, 'Cart cleared successfully'));
  } catch (error) {
    next(error);
  }
};
