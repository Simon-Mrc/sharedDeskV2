import { randomUUID } from "node:crypto";
import { Item } from "../../../shared/types";
import db from '../db/database';
import Database from "better-sqlite3";

export class ItemsServices{
        private db : InstanceType<typeof Database>;       
        constructor (db : InstanceType<typeof Database>){
            this.db = db
        }
   
        getAllItermsByUserId(userId : string) : Item[]{
        try{
            let arrayOfItems = this.db.prepare(`
                SELECT items.*, users.userColor AS creatorColor,
                users.userName AS creatorName
                FROM items
                LEFT JOIN users ON items.createdBy = users.id
                WHERE items.createdBy = ?
                `).all(userId) as Item[];
            return arrayOfItems;
        }catch(error){
            throw error
        }
        }
        
        getItemById(itemId : string) : Item {
            try{
                let item = db.prepare(`
                    SELECT items.*, users.userColor as creatorColor,
                    users.userName as creatorName
                    FROM items
                    LEFT JOIN users ON items.createdBy = users.id
                    WHERE items.id = ?
                    `).get(itemId) as Item;
                return item
            }catch(error){
                throw error 
            }
        }

        createItem(userId : string, hashPswrd : string, item : Omit<Item,'id'|'creatorColor'>):
        Item|null{
            try{
                const id = randomUUID();
                const myTransaction = db.transaction(()=>{
                    db.prepare(`
                        INSERT INTO items
                        (id,deskId,name,type,x,y,accessPassword,createdBy,parentId)
                        VALUES
                        (?,?,?,?,?,?,?,?,?)
                        `).run(id,item.deskId,item.name,item.type,item.x,item.y,hashPswrd,userId,item.parentId);
                        const arrayOfUserId = db.prepare(`
                        SELECT userId FROM deskAccess
                        WHERE deskId = ?    
                        `).all(item.deskId) as {userId : string}[];
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
                return newItem
            }catch(error){
                throw error;
            }
        }

    
}

export const itemServices = new ItemsServices(db)

