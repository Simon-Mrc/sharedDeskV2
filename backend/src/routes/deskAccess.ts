import { Router } from 'express';
import deskAccessController from '../controllers/deskAccessController';
import { authenticateToken } from '../middleware/authMiddleware';
import { validate } from '../middleware/validateMiddleware';
import { InviteUserSchema, ChangeAccessTypeSchema } from '../validation/schemas';
const router = Router();

router.post('/:deskId', authenticateToken, deskAccessController.inviteToDeskByUserId);

router.get('/user/accessType/:deskId',authenticateToken,deskAccessController.getAccessType);

router.get('/desks',authenticateToken,deskAccessController.getAllSharedDeskIdByUserId);

router.get('/users/:deskId',authenticateToken,deskAccessController.getAllUsersByDeskId);

router.put('/accessType/userId/:deskId',authenticateToken,deskAccessController.changeAccessTypeByUserId);

router.delete('/user/:deskId',authenticateToken,deskAccessController.quitSharedByDeskId);

export default router