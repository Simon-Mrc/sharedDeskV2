import { Router } from 'express';
// import itemController from '../controllers/itemController';
import { authenticateToken } from '../middleware/authMiddleware';
import { validate } from '../middleware/validateMiddleware';
import { ItemSchema, UpdateItemSchema } from '../validation/schemas';
import {ItemController} from '../controllers/itemController';

const itemController = new ItemController()

const router = Router();

// router.get('/user',authenticateToken,itemController.getAllItemByUserId);
router.get('/user',authenticateToken,itemController.getAllItemsByUserId.bind(itemController));

// router.get('/desks/:deskId', authenticateToken, itemController.getAllItemsByDeskId);
router.get('/desks/:deskId', authenticateToken, itemController.getAllItemsByDeskId.bind(itemController));

// router.get('/:id',authenticateToken,itemController.getItemById);
router.get('/:id',authenticateToken,itemController.getItemById);

// router.post('/',authenticateToken,  itemController.createItem);
router.post('/',authenticateToken,  itemController.createItem.bind(itemController));

// router.put('/:id',authenticateToken, itemController.updateItemById);
router.put('/:id',authenticateToken, itemController.updateItemById.bind(itemController));

// router.delete('/:id',authenticateToken,itemController.deleteItemById);
router.delete('/:id',authenticateToken,itemController.deleteItemById.bind(itemController));

export default router