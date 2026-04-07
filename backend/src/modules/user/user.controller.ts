import { Request, Response, NextFunction } from 'express';
import { UserService } from './user.service';
import { formatResponse } from '../../utils/helpers';

export const getUsers = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 20;
    const search = req.query.search as string | undefined;

    const result = await UserService.getAllUsers(page, limit, search);
    res.status(200).json(formatResponse(true, 'Users retrieved successfully', result));
  } catch (error) {
    next(error);
  }
};

export const getUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = await UserService.getUserById(req.params.id);
    res.status(200).json(formatResponse(true, 'User retrieved successfully', user));
  } catch (error) {
    next(error);
  }
};

export const updateUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = await UserService.updateUser(req.params.id, req.body);
    res.status(200).json(formatResponse(true, 'User updated successfully', user));
  } catch (error) {
    next(error);
  }
};

export const deleteUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    await UserService.deleteUser(req.params.id);
    res.status(200).json(formatResponse(true, 'User deleted successfully', null));
  } catch (error) {
    next(error);
  }
};

export const getUserStats = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const stats = await UserService.getUserStats();
    res.status(200).json(formatResponse(true, 'User stats retrieved successfully', stats));
  } catch (error) {
    next(error);
  }
};
