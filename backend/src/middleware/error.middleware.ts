import { Request, Response, NextFunction } from 'express';
import { ZodError } from 'zod';
import { Prisma } from '@prisma/client';
import { AppError } from '../utils/helpers';
import { logger } from '../utils/logger';

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  logger.error(`[Error] ${err.name}: ${err.message}`, { stack: err.stack });

  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      success: false,
      message: err.message,
    });
  }

  if (err instanceof ZodError) {
    const errors = err.errors.map((e) => ({
      path: e.path.join('.'),
      message: e.message,
    }));
    return res.status(400).json({
      success: false,
      message: 'Validation failed',
      errors,
    });
  }

  // Prisma known request errors (FK violations, unique constraint, etc.)
  if (err instanceof Prisma.PrismaClientKnownRequestError) {
    if (err.code === 'P2003') {
      return res.status(400).json({ success: false, message: 'Cannot complete operation: record is referenced by other data.' });
    }
    if (err.code === 'P2025') {
      return res.status(404).json({ success: false, message: 'Record not found.' });
    }
    if (err.code === 'P2002') {
      return res.status(409).json({ success: false, message: 'A record with this value already exists.' });
    }
    return res.status(400).json({ success: false, message: err.message });
  }

  if (err.name === 'TokenExpiredError') {
    return res.status(401).json({ success: false, message: 'Token expired' });
  }

  if (err.name === 'JsonWebTokenError') {
    return res.status(401).json({ success: false, message: 'Invalid token' });
  }

  return res.status(500).json({
    success: false,
    message: 'Internal server error',
  });
};
