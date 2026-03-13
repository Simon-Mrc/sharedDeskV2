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

////////////////////////////// GET ALL ITEM UPDATES BY USERID ////////////////////////////////
const getAllItemByUserId = (req : Request , res : Response<Omit<ItemUpdateType,'deskId'>[]|null>)=>{
    try{
        const userId = (req as any).user.userId;
        const arrayOfItem = db.prepare(`
            SELECT * FROM itemUpdates
            WHERE userId = ?
            `).all(userId) as Omit<ItemUpdateType,'deskId'>[]
        return res.json(arrayOfItem);
    }catch(error){
        return null;
    }
}

////////////////////////////// GET ALL ITEM UPDATES + DESKIS BY USERID ////////////////////////////////
const getAllUpdatesAndDesk = (req : Request,res : Response<ItemUpdateType[]|null>)=>{
    try{
        const userId = (req as any).user.userId
        const arrayOfItem = db.prepare(`
            SELECT itemUpdates.*, items.deskId FROM itemUpdates
            JOIN items ON itemUpdates.itemId = items.id
            WHERE itemUpdates.userId = ?
            `).all(userId) as ItemUpdateType[];
        return res.json(arrayOfItem);
    }catch(error){
        return res.json(null)
    }
}
/////////////////////////////////////////////////////////////////
///////////////////////QUERY EXPLANATION/////////////////////////
/////////////////////////////////////////////////////////////////
        // SELECT itemUpdates.*, items.deskId 
        // -- take ALL columns from itemUpdates + ONLY deskId from items

        // FROM itemUpdates
        // -- starting table

        // JOIN items ON itemUpdates.itemId = items.id
        // -- link the two tables where itemId matches

        // WHERE itemUpdates.userId = ?
        // -- then filter by userId
////////////////////////////////////////////////////////////////////
export default {updateViewed, getAllItemByUserId,getAllUpdatesAndDesk}
