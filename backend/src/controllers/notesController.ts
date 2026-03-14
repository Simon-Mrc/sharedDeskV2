import { Request, Response } from 'express';
import db from '../db/database';
import { User, JwtPayload, Item, Note } from "../../../shared/types";
import * as bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { randomUUID } from 'node:crypto';


/////////////// CREATE NOTE STORE IN ITEMS TABLE STORE IN UPDATES TABLE STORE IN NOTES TABLE /////////////////
const createNote =async (req : Request<{},{},{itemB :Omit<Item,'id'>, content : string}>,res:Response<Note|null>)=>{
    try{
        const id = randomUUID();
        const {itemB , content} = req.body;
        const {deskId , name , x , y  ,parentId} = itemB;      
        const userId =(req as any).user.userId;
        const hashPswrd = req.body.itemB.accessPassword ? await bcrypt.hash(req.body.itemB.accessPassword,10) :null;
        const myTransaction = db.transaction(()=>{
            db.prepare(`
                INSERT INTO items
                (id,deskId,name,type,x,y,accessPassword,createdBy,parentId)
                VALUES
                (?,?,?,?,?,?,?,?,?)
                `).run(id,deskId,name,'note',x,y,hashPswrd,userId,parentId);
                const arrayOfUserId = db.prepare(`
                SELECT userId FROM deskAccess
                WHERE deskId = ?    
                `).all(deskId) as {userId : string}[];
                arrayOfUserId.forEach(object => {
                    db.prepare(`
                    INSERT INTO itemUpdates
                    (itemId,userId,lastModified,lastViewed)
                    VALUES
                    (?,?,?,?)
                    `).run(id,object.userId,Date.now(),0)                    
                });
            db.prepare(`
                INSERT INTO notes
                (itemId , content)
                VALUES
                (?,?)
                `).run(id,content)
                const newItem = db.prepare(`
                    SELECT items.* , users.userColor as creatorColor
                    FROM items
                    JOIN users ON users.id = items.createdBy
                    WHERE items.id = ?
                    `).get(id) as Item;        
            return newItem
            }
        )
        const item = myTransaction();
        return res.json({item,content})
    }catch(error){
        res.status(500).json(null)
    }
}

///////////////////////// GET NOTE BY ID WITH JOIN ON ITEMS ///////////////////
const getNotesById = async (req : Request<{itemId : string}>, res: Response<Note|null>)=>{
    try{
        const result = db.prepare(`
            SELECT items.* ,notes.content FROM items
            JOIN notes ON items.id = notes.itemId
            WHERE items.id = ?
            `).get(req.params.itemId) as Item & {content : string };
        if(!result) return res.status(404).json(null);
        const {content,...item} = result;
        const note = {item , content} 
        return res.json(note)
    }catch(error){
        return res.status(500).json(null);
    }
}

//////////////////////// UPDATE ONLY THE CONTENT THERE /////////////////////////
const updateNote = async ( req : Request<{itemId : string},{},{content : string}>, res : Response<{content : string}|null>)=>{
    try{
        const transaction = db.transaction(()=>{
            db.prepare(`
                UPDATE notes SET
                content = ?
                WHERE itemId = ? 
                `).run(req.body.content,req.params.itemId);
            db.prepare(`
                UPDATE itemUpdates SET
                lastModified = ?
                WHERE itemId = ?
                `).run(Date.now(),req.params.itemId)
            return true;
        })
        const check = transaction();
        return check ? res.json({content : req.body.content}) : res.status(404).json(null);
    }catch(error){
        return res.status(500).json(null);
    }
}

export default {createNote, getNotesById,updateNote}