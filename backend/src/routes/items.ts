import { Router } from 'express';
import itemController from '../controllers/itemController';
import { authenticateToken } from '../middleware/authMiddleware';
import { validate } from '../middleware/validateMiddleware';
import { ItemSchema, UpdateItemSchema } from '../validation/schemas';
// import {ItemController} from '../controllers/itemController';
import db from '../db/database';

// const itemController = new ItemController(db)

const router = Router();

router.get('/user',authenticateToken,itemController.getAllItemByUserId);
// router.get('/user',authenticateToken,itemController.getAllItemByUserId.bind(itemController));

router.get('/desks/:deskId', authenticateToken, itemController.getAllItemByDeskId);

router.get('/:id',authenticateToken,itemController.getItemById);

router.post('/',authenticateToken,  itemController.createItem);

router.put('/:id',authenticateToken, itemController.updateItemById);

router.delete('/:id',authenticateToken,itemController.deleteItemById);

export default router