import { Request, Response, NextFunction } from 'express';
import { v2 as cloudinary } from 'cloudinary';
import { config } from '../../config/env';
import { AppError } from '../../utils/helpers';

// Config runs after dotenv via config/env.ts — guaranteed to have values
cloudinary.config({
  cloud_name: config.cloudinaryCloudName,
  api_key:    config.cloudinaryApiKey,
  api_secret: config.cloudinaryApiSecret,
});

export class UploadController {
  static async uploadImage(req: Request, res: Response, next: NextFunction) {
    try {
      if (!req.file) throw new AppError('No file provided', 400);
      if (!req.file.buffer || req.file.buffer.length === 0) {
        throw new AppError('Empty file buffer — ensure multipart/form-data is sent correctly', 400);
      }

      const url = await new Promise<string>((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          { folder: 'gauyog', resource_type: 'image', quality: 'auto', fetch_format: 'auto' },
          (error, result) => {
            if (error) return reject(new AppError(error.message ?? 'Cloudinary upload failed', 500));
            if (!result) return reject(new AppError('Cloudinary returned no result', 500));
            resolve(result.secure_url);
          },
        );
        stream.end(req.file!.buffer);
      });

      res.status(200).json({ status: 'success', data: { url } });
    } catch (error) {
      next(error);
    }
  }
}
