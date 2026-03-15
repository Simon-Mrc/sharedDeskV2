import { Router } from 'express';
import fileController from '../controllers/fileController';
import { authenticateToken } from '../middleware/authMiddleware';
import { validate } from '../middleware/validateMiddleware';
import { ItemSchema, UpdateItemSchema } from '../validation/schemas';
import multer from 'multer';

const upload = multer({ storage: multer.memoryStorage() }) // ← keeps file in memory as buffer

const router = Router();

router.get('/download/:id',authenticateToken,fileController.downloadFile);

router.post('/upload',authenticateToken,upload.single('file'),  fileController.uploadFile);

router.delete('/delete/:id',authenticateToken,fileController.deleteFileDb);

router.patch(`/:id`, authenticateToken,upload.single('file'), fileController.updateFile);

export default router