//////////////////////////////////////////////////////////////////////
//////////////////////////    IMPORT HERE     ////////////////////////
//////////////////////////////////////////////////////////////////////
import { Request, Response } from 'express';
import db from '../db/database';
import { Desk, Item } from "../../../shared/types";
import * as bcrypt from 'bcrypt';


//////////////////////////////////////////////////////////////////////
//////////////////////////    ROUTE FUNCTIONS     ////////////////////////
//////////////////////////////////////////////////////////////////////

/////////////////////////////// GET ALL ITEM BY USER /////////////////////////////
const getAllItemByUserId = (req : Request,res : Response<Item[]|{error:string}>)=>{
    try{
        const userId = (req as any).user.userId
        let arrayOfItems = db.prepare(`
            SELECT * FROM items
            WHERE createdBy = ?
            `).all(userId) as Item[];
        res.json(arrayOfItems);
    }catch(error){
        res.status(404).json({error : 'User doesn t have any item'})
    }
}

/////////////////////////////// GET ITEM BY ID /////////////////////////////
const getItemById = (req: Request<{id : string}>,res:Response<Item|{error:string}>)=>{
    try{
        let item = db.prepare(`
            SELECT * FROM items
            WHERE id = ?
            `).get(req.params.id) as Item;
        res.json(item)
    }catch(error){
        res.status(404).json({error:'fail to find desired item'})
    }
}

/////////////////////////////// CREATE ITEM  /////////////////////////////
const createItem =async (req : Request<{},{},Item>,res:Response<{message : string}|{error : string}>)=>{
    try{
        const userId =(req as any).user.userId;
        if(req.body.accessPassword!=null){
        db.prepare(`
            INSERT INTO items
            (id,deskId,name,type,x,y,accessPassword,createdBy,creatorColor,parentId)
            VALUES
            (?,?,?,?,?,?,?,?,?,?)
            `).run(req.body.id,req.body.deskId,req.body.name,req.body.type,req.body.x,req.body.y,await bcrypt.hash(req.body.accessPassword,10),userId,req.body.creatorColor,req.body.parentId)
        }else{
            db.prepare(`
                INSERT INTO items
                (id,deskId,name,type,x,y,accessPassword,createdBy,creatorColor,parentId)
                VALUES
                (?,?,?,?,?,?,?,?,?,?)
                `).run(req.body.id,req.body.deskId,req.body.name,req.body.type,req.body.x,req.body.y,null,userId,req.body.creatorColor,req.body.parentId)
        }
        res.json({message : 'Item created !'})
    }catch(error){
        res.status(404).json({error : 'Item creation failure'})
    }
}

/////////////////////////////// UPDATE ITEM BY ID /////////////////////////////
const updateItemById = (req:Request<{id : string},{},Omit<Item,'id'>>,res:Response<{message : string}|{error:string}>)=>{
    try{
        db.prepare(`
            UPDATE items SET
            deskId = ?,
            name=?,
            type = ?,
            x= ?,
            y=?,
            creatorColor = ?
            WHERE id = ?
            `).run(req.body.deskId,req.body.name,req.body.type,req.body.x,req.body.y,req.body.creatorColor,req.params.id);
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

export default {getAllItemByUserId,getItemById,createItem,updateItemById,deleteItemById}