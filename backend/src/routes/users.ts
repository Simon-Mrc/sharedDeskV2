import { Router } from 'express';
import userController from '../controllers/userController';
import { authenticateToken } from '../middleware/authMiddleware';
import { validate } from '../middleware/validateMiddleware';
import { UserSchema, LoginSchema, UpdateUserSchema } from '../validation/schemas';

const router = Router();

router.post('/login', userController.login);

router.post(`/search`, authenticateToken, userController.getBySearch);

router.get('/search/:userName',authenticateToken, userController.getUserByUserName);

router.post('/', userController.createUser);

router.put('/:id',authenticateToken, userController.updateUser);

router.delete('/:id',authenticateToken, userController.deleteUserById);

router.get('/:id',authenticateToken, userController.getById);  // ← just points to controller!

router.get('/',authenticateToken, userController.getAll);

export default router;