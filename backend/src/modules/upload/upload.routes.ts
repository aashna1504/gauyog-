import { Router } from 'express';
import multer from 'multer';
import { UploadController } from './upload.controller';

// Keep files in memory — Cloudinary streams them; no local disk needed
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 10 * 1024 * 1024 },
  fileFilter: (_req, file, cb) => {
    if (file.mimetype.startsWith('image/')) cb(null, true);
    else cb(new Error('Only image files are allowed'));
  },
});

const router = Router();
router.post('/', upload.single('image'), UploadController.uploadImage);

export default router;
