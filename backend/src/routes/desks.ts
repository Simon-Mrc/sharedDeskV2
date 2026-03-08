import { Router } from 'express';
import deskController from '../controllers/deskController';
import { authenticateToken } from '../middleware/authMiddleware';
import { validate } from '../middleware/validateMiddleware';
import { DeskSchema, UpdateDeskSchema } from '../validation/schemas';
const router = Router();
router.post('/',authenticateToken, deskController.createDesk);

router.get('/user/',authenticateToken, deskController.getAllDesksByUserId);

router.get('/:id',authenticateToken, deskController.getDeskById);

router.delete('/:id',authenticateToken,deskController.deleteDeskById);

router.put('/:id',authenticateToken, deskController.updateDesk);

export default router















//router.get('/NeverGonnaGiveYouUp/NeverGonnaLetYouDown/:id',authenticateToken,deskController.getDeskByIdAndPasswordUselessFunctionTooLongToPreventAnyoneFromEverUsingIt);