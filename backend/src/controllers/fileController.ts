import { Request,  Response } from 'express';
import db from '../db/database';
import { Item } from "../../../shared/types";
import * as bcrypt from 'bcrypt';
import { randomUUID } from 'crypto';
import { deleteFile, saveFile } from '../services/fileService';
import { join } from 'node:path';
import { file } from 'zod';

//////////////////////////////////////////////////////////////////////
//////////////////////////    ROUTE FUNCTIONS     ////////////////////////
//////////////////////////////////////////////////////////////////////

//////////////CREATE ITEM + UPLOAD CONTENT ////////////////
const uploadFile =async (
    req : Request<{} , {} , Omit<Item,'creatorColor'|'id'>>,
    res : Response <Item |null>)=>{
        try{
            const id = randomUUID();
            const userId =(req as any).user.userId;
            const hashPswrd = req.body.accessPassword ? await bcrypt.hash(req.body.accessPassword,10) :null;
            const fileUpload = req.file;
            const {deskId , name , type , x , y , createdBy , parentId,...nonusedItem} = req.body
            if(fileUpload){
                const filePath = await saveFile(fileUpload,deskId);
                if (filePath){
                    const myTransaction = db.transaction(()=>{
                        db.prepare(`
                            INSERT INTO items
                            (id,deskId,name,type,x,y,accessPassword,createdBy,parentId,filePath)
                            VALUES
                            (?,?,?,?,?,?,?,?,?,?)
                            `).run(id, deskId, name, type,x,y,hashPswrd,userId,parentId,filePath);
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
                            SELECT items.*, users.userColor as creatorColor
                            FROM items
                            JOIN users ON users.id = items.createdBy
                            WHERE items.id = ?
                            `).get(id) as Item;
                        return newItem;
                })
                const newItem = myTransaction();
                return res.json(newItem);
                }else{
                    return  res.status(500).json(null);
                }         
            }else{
               return  res.status(500).json(null);
            }
        }catch(error){
            res.status(404).json(null)
        }
    }

    //////////////DOWNLOAD CONTENT  ////////////////
const downloadFile = (req : Request<{id : string}>, res : Response)=>{
    try{
        const existFile = db.prepare(`
            SELECT * from items WHERE id = ?
            `).get(req.params.id) as Item;
        if(existFile.filePath){
            const absolutePath = join(__dirname, '../../', existFile.filePath)
            return res.download(absolutePath)
        }else{
            return res.status(404).json(null)
        }
    }catch(error){
        return res.status(500).json(null)
    }
}

///////////////////////// DELETE ITEM FROM DISK //////////////////////
const deleteFileDb =async  (req : Request<{id : string}> , res : Response)=>{
    try{
        const myTransaction = db.transaction(()=>{
            const itemFilePathId = db.prepare(`
                SELECT id,filePath FROM items WHERE id = ? 
                `).get(req.params.id) as {id : string, filePath : string};
            db.prepare(`
                DELETE FROM items WHERE id = ?
                `).run(req.params.id);
            return itemFilePathId.filePath ?? null;
        })
        const filePath = myTransaction();
        await deleteFile(filePath);
        return res.json(null)
    }catch(error){
        return res.status(404).json(null);
    }
}

/////////////////////////// UPDATE FILE WITH DOWNLOAD CONTENT ///////////////////
const updateFile = async (req : Request<{id : string}>, res : Response)=>{
    try{
        const file = req.file;
        if(file){
            const item = db.prepare(`
                SELECT * FROM items
                WHERE id = ?
                `).get(req.params.id) as Item;
            const filePath = await saveFile(file,item.deskId)
            db.prepare(`
                UPDATE items SET
                filePath = ?
                WHERE id = ?
                `).run(filePath,req.params.id);
            return res.json(null)
        }
        return res.status(500).json(null);
    }catch(error){
        return res.status(500).json(null);
    }
}

export default {uploadFile, deleteFileDb, downloadFile, updateFile}