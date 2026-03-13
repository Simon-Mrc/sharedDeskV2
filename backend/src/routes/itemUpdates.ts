import { Router } from 'express';
import itemUpdatesController from '../controllers/itemUpdatesController';
import { authenticateToken } from '../middleware/authMiddleware';
import { validate } from '../middleware/validateMiddleware';
import { UserSchema, LoginSchema, UpdateUserSchema } from '../validation/schemas';

const router = Router();

router.put(`/:itemId`,authenticateToken, itemUpdatesController.updateViewed);

router.get('/allItems', authenticateToken ,itemUpdatesController.getAllItemByUserId);

export default router