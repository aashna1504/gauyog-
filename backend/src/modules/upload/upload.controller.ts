import { Request, Response, NextFunction } from 'express';
import { AppError } from '../../utils/helpers';

export class UploadController {
  static async uploadImage(req: Request, res: Response, next: NextFunction) {
    try {
      if (!req.file) throw new AppError('No file provided', 400);

      const host = `${req.protocol}://${req.get('host')}`;
      const url = `${host}/uploads/${req.file.filename}`;

      res.status(200).json({ status: 'success', data: { url } });
    } catch (error) {
      next(error);
    }
  }
}
