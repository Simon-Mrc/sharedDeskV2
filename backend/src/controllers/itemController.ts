//////////////////////////////////////////////////////////////////////
//////////////////////////    IMPORT HERE     ////////////////////////
//////////////////////////////////////////////////////////////////////
import { NextFunction, Request,  Response } from 'express';
import db from '../db/database';
import { Desk, Item } from "../../../shared/types";
import * as bcrypt from 'bcrypt';
import { randomUUID } from 'crypto';
import Database from 'better-sqlite3';
import { itemServices, ItemsServices } from '../services/itemServices';

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
            res.json(items)
            }catch(error){
            next(error)
            }
        }
    
    getItemById = (req: Request<{id : string}>,res:Response<Item|null>, next : NextFunction)=>{
        const itemId = req.params.id;
        try{
            const item = itemServices.getItemById(itemId);
            res.json(item)
        }catch(error){
            next(error)
        }
    }

    createItem = async (req : Request<{},{},Omit<Item,'id'|'creatorColor'>>,res:Response<Item|null>,next : NextFunction)=>{
    const userId = (req as any).user.userId;
    let hashPswrd = '';
    req.body.accessPassword ? hashPswrd = await bcrypt.hash(req.body.accessPassword ,10) : '';
    try{
        const newItem = itemServices.createItem(userId,hashPswrd,req.body);
        res.json(newItem);
    }catch(error){
        next(error);
    }

    }
    

}

/////////////////////////////// GET ALL ITEM BY USER /////////////////////////////
const getAllItemByUserId = (req : Request,res : Response<Item[]|null>)=>{
    try{
        const userId = (req as any).user.userId
        let arrayOfItems = db.prepare(`
            SELECT items.*, users.userColor AS creatorColor,
            users.userName AS creatorName
            FROM items
            LEFT JOIN users ON items.createdBy = users.id
            WHERE items.createdBy = ?
            `).all(userId) as Item[];
        res.json(arrayOfItems);
    }catch(error){
        res.json(null)
    }
}

/////////////////////////////// GET ITEM BY ID /////////////////////////////
const getItemById = (req: Request<{id : string}>,res:Response<Item|null>)=>{
    try{
        let item = db.prepare(`
            SELECT items.*, users.userColor as creatorColor,
            users.userName as creatorName
            FROM items
            LEFT JOIN users ON items.createdBy = users.id
            WHERE items.id = ?
            `).get(req.params.id) as Item;
        res.json(item)
    }catch(error){
        res.status(404).json(null)
    }
}

/////////////////////////////// CREATE ITEM  /////////////////////////////
const createItem =async (req : Request<{},{},Omit<Item,'id'|'creatorColor'>>,res:Response<Item|null>)=>{
    try{
        const id = randomUUID();
        const userId =(req as any).user.userId;
        const hashPswrd = req.body.accessPassword ? await bcrypt.hash(req.body.accessPassword,10) :null;
        const myTransaction = db.transaction(()=>{
            db.prepare(`
                INSERT INTO items
                (id,deskId,name,type,x,y,accessPassword,createdBy,parentId)
                VALUES
                (?,?,?,?,?,?,?,?,?)
                `).run(id,req.body.deskId,req.body.name,req.body.type,req.body.x,req.body.y,hashPswrd,userId,req.body.parentId);
                const arrayOfUserId = db.prepare(`
                SELECT userId FROM deskAccess
                WHERE deskId = ?    
                `).all(req.body.deskId) as {userId : string}[];
                arrayOfUserId.forEach(object => {
                    db.prepare(`
                    INSERT INTO itemUpdates
                    (itemId,userId,lastModified,lastViewed)
                    VALUES
                    (?,?,?,?)
                    `).run(id,object.userId,Date.now(),0)                    
                });
                const newItem = db.prepare(`
                    SELECT items.*, users.userColor as creatorColor,
                    users.userName as creatorName
                    FROM items
                    LEFT JOIN users ON users.id = items.createdBy
                    WHERE items.id = ?
                    `).get(id) as Item;        
            return newItem
            }
        )
        const newItem = myTransaction();
        return res.json(newItem)
    }catch(error){
        res.status(404).json(null)
    }
}

/////////////////////////////// UPDATE ITEM BY ID /////////////////////////////
const updateItemById = (req:Request<{id : string},{},Omit<Item,'id'|'creatorColor'>>,res:Response<{message : string}|{error:string}>)=>{
    try{
        const userId = (req as any).user.userId;
        const myTransaction = db.transaction(()=>{
            db.prepare(`
                UPDATE items SET
                deskId = ?,
                name=?,
                type = ?,
                x= ?,
                y=?,
                accessPassword = ?,
                parentId = ?
                WHERE id = ?
                `).run(req.body.deskId,req.body.name,req.body.type,req.body.x,req.body.y,req.body.accessPassword,req.body.parentId,req.params.id);     
                db.prepare(`
                    UPDATE itemUpdates SET
                    lastModified = ?
                    WHERE itemId = ?
                    `).run(Date.now(),req.params.id)
                db.prepare(`
                    UPDATE itemUpdates SET
                    lastViewed = ?
                    WHERE (userId = ? AND itemId = ?)
                `).run(Date.now(),userId,req.params.id);
            })
            myTransaction();
            res.json({message:'item successfully updated'})
        }catch(error){
            res.status(404).json({error:'fail to find item'});
        }
    }


/////////////////////////////// DELETE ITEM BY ID /////////////////////////////
const deleteItemById = (req : Request<{id:string}>,res:Response<{message:string}|{error:string}>)=>{
    try{
        db.prepare(`
            DELETE FROM items
            WHERE id = ?
            `).run(req.params.id)
            res.json({message:'Item deleted'})
    }catch(error){
        res.status(404).json({error :'Item already gone '})
    }
}

/////////////////////////////// GET ALL ITEM BY DESK ID /////////////////////////////
const getAllItemByDeskId = (req : Request<{deskId : string}>,res : Response <Item[]|null>)=>{
    try{
        const arrayOfItems = db.prepare(`
            SELECT items.*, users.userColor as creatorColor,
            users.userName as creatorName
            FROM items
            LEFT JOIN users ON items.createdBy = users.id
            WHERE items.deskId = ?
            `).all(req.params.deskId) as Item[]
        return res.json(arrayOfItems);
    }catch(error){
        res.status(404).json(null)
    }
}

export default {getAllItemByUserId,getItemById,createItem,updateItemById,deleteItemById, getAllItemByDeskId}