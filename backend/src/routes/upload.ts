import { Router } from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { requireAuth, AuthenticatedRequest } from '../middleware/auth';

const router = Router();

// Ensure uploads folder exists relative to this file
// Note: __dirname in source ts is src/routes, so '../../uploads' reaches backend/uploads
const uploadDir = path.resolve(__dirname, '../../uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Multer storage configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname);
    // sanitize filename to avoid spacing issues
    const safeName = file.originalname.replace(/[^a-zA-Z0-9]/g, '_');
    cb(null, safeName + '-' + uniqueSuffix + ext);
  }
});

const upload = multer({
  storage,
  limits: {
    fileSize: 10 * 1024 * 1024 // 10MB limit
  }
});

// POST /api/upload
router.post('/', requireAuth, upload.single('file'), (req: AuthenticatedRequest, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    const fileUrl = `/uploads/${req.file.filename}`;
    return res.status(201).json({
      name: req.file.originalname,
      url: fileUrl
    });
  } catch (error) {
    console.error('File upload error:', error);
    return res.status(500).json({ error: 'Failed to upload file' });
  }
});

export default router;
