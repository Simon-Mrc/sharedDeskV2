//////////////////////////////////////////////////////////////////////
//////////////////////////    IMPORT HERE     ////////////////////////
//////////////////////////////////////////////////////////////////////
import { Request, response, Response } from 'express';
import db from '../db/database';
import { Item, ItemUpdateType } from '../../../shared/types';

//////////////////////////////////////////////////////////////////////
//////////////////////////    ROUTE FUNCTIONS     ////////////////////////
//////////////////////////////////////////////////////////////////////

////////////////////////////// UPDATE LAST VIEWED ////////////////////////////////
const updateViewed = (req : Request<{itemId : string}>,res : Response<{message : string}|null>)=>{
    try{
        const userId = (req as any).user.userId
        db.prepare(`
            UPDATE itemUpdates SET
            lastViewed = ?
            WHERE (userId = ? AND itemId = ?)
            `).run(Date.now(),userId,req.params.itemId)
        return res.json({message : 'up to date'})
    }catch(error){
        return null;
    }
}

////////////////////////////// UPDATE LAST VIEWED ////////////////////////////////
const getAllItemByUserId = (req : Request , res : Response<ItemUpdateType[]|null>)=>{
    try{
        const userId = (req as any).user.userId;
        const arrayOfItem = db.prepare(`
            SELECT * FROM itemUpdates
            WHERE userId = ?
            `).all(userId) as ItemUpdateType[]
        return res.json(arrayOfItem);
    }catch(error){
        return null;
    }
}

export default {updateViewed, getAllItemByUserId}
