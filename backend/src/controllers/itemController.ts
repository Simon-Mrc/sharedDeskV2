//////////////////////////////////////////////////////////////////////
//////////////////////////    IMPORT HERE     ////////////////////////
//////////////////////////////////////////////////////////////////////
import { NextFunction, Request,  Response } from 'express';
import { Item } from "../../../shared/types";
import { itemServices } from '../services/itemServices';

//////////////////////////////////////////////////////////////////////
//////////////////////////    ROUTE FUNCTIONS     ////////////////////////
//////////////////////////////////////////////////////////////////////

////////////// REWORK WITH CLASSES ////////////////
export class ItemController {
    getAllItemsByUserId= (req : Request,
        res : Response<Item[]|null>, next : NextFunction)=>{
            const userId = (req as any).user.userId;
            try{
                const items = itemServices.getAllItermsByUserId(userId)
            return res.json(items)
            }catch(error){
            next(error)
            }
        }
    
    getItemById = (req: Request<{id : string}>,res:Response<Item|null>, next : NextFunction)=>{
        const itemId = req.params.id;
        try{
            const item = itemServices.getItemById(itemId);
            return res.json(item)
        }catch(error){
            next(error)
        }
    }

    createItem = async (req : Request<{},{},Omit<Item,'id'|'creatorColor'>>,res:Response<Item|null>,next : NextFunction)=>{
        const userId = (req as any).user.userId;
        try{
            const newItem = await itemServices.createItem(userId,req.body);
            return res.json(newItem);
        }catch(error){
            await next(error);
        }
    }
    
    updateItemById = (req:Request<{id : string},{},Omit<Item,'id'|'creatorColor'>>,res:Response<Omit<Item,'creatorColor'>>, next : NextFunction)=>{
        const userId = (req as any).user.userId;
        const id = req.params.id;
        const item = {...req.body,id}
        try{
            const updatedItem = itemServices.updateItemById(userId,item);
            return res.json(updatedItem);
        }catch(error){
            next(error);
        }
    }

    deleteItemById = (req : Request<{id:string}>,res:Response<null>, next : NextFunction)=>{
        try{
            const result = itemServices.deleteItemById(req.params.id);
            return res.json(result);
        }catch(error){
            next(error);
        }
    }

    getAllItemsByDeskId = (req : Request<{deskId : string}>,res : Response <Item[]|null>, next : NextFunction)=>{
        try{
            const arrayOfItems = itemServices.getAllItemByDeskId(req.params.deskId);
            return res.json(arrayOfItems)
        }catch(error){
            next(error)
        }
    }
}

