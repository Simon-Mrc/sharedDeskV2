import { Router } from 'express';
import notesController from '../controllers/notesController';
import { authenticateToken } from '../middleware/authMiddleware';
import { validate } from '../middleware/validateMiddleware';
import { UserSchema, LoginSchema, UpdateUserSchema } from '../validation/schemas';

const router = Router();

router.get('/:itemId',authenticateToken, notesController.getNotesById);

router.post('/', authenticateToken, notesController.createNote);

router.put('/:itemId',authenticateToken, notesController.updateNote);



export default router;