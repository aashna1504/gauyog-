"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UploadController = void 0;
const cloudinary_1 = require("cloudinary");
const env_1 = require("../../config/env");
const helpers_1 = require("../../utils/helpers");
// Config runs after dotenv via config/env.ts — guaranteed to have values
cloudinary_1.v2.config({
    cloud_name: env_1.config.cloudinaryCloudName,
    api_key: env_1.config.cloudinaryApiKey,
    api_secret: env_1.config.cloudinaryApiSecret,
});
class UploadController {
    static async uploadImage(req, res, next) {
        try {
            if (!req.file)
                throw new helpers_1.AppError('No file provided', 400);
            if (!req.file.buffer || req.file.buffer.length === 0) {
                throw new helpers_1.AppError('Empty file buffer — ensure multipart/form-data is sent correctly', 400);
            }
            const url = await new Promise((resolve, reject) => {
                const stream = cloudinary_1.v2.uploader.upload_stream({ folder: 'gauyog', resource_type: 'image', quality: 'auto', fetch_format: 'auto' }, (error, result) => {
                    if (error)
                        return reject(new helpers_1.AppError(error.message ?? 'Cloudinary upload failed', 500));
                    if (!result)
                        return reject(new helpers_1.AppError('Cloudinary returned no result', 500));
                    resolve(result.secure_url);
                });
                stream.end(req.file.buffer);
            });
            res.status(200).json({ status: 'success', data: { url } });
        }
        catch (error) {
            next(error);
        }
    }
}
exports.UploadController = UploadController;
