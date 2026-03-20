import { randomUUID } from "node:crypto";
import { Item } from "../../../shared/types";
import db from '../db/database';
import Database from "better-sqlite3";
import * as bcrypt from 'bcrypt';

export class ItemsServices{
        private db : InstanceType<typeof Database>;       
        constructor (db : InstanceType<typeof Database>){
            this.db = db
        }
   
        getAllItermsByUserId(userId : string) : Item[]{
            let arrayOfItems = this.db.prepare(`
                SELECT items.*, users.userColor AS creatorColor,
                users.userName AS creatorName
                FROM items
                LEFT JOIN users ON items.createdBy = users.id
                WHERE items.createdBy = ?
                `).all(userId) as Item[];
            return arrayOfItems;
        }
        
        getItemById(itemId : string) : Item {
                let item = this.db.prepare(`
                    SELECT items.*, users.userColor as creatorColor,
                    users.userName as creatorName
                    FROM items
                    LEFT JOIN users ON items.createdBy = users.id
                    WHERE items.id = ?
                    `).get(itemId) as Item;
                return item
        }

        async createItem(userId : string, item : Omit<Item,'id'|'creatorColor'>):
        Promise<Item|null>{
                let hashPswrd = '';
                item.accessPassword ? hashPswrd = await bcrypt.hash(item.accessPassword ,10) : '';        
                const id = randomUUID();
                const myTransaction = this.db.transaction(()=>{
                    db.prepare(`
                        INSERT INTO items
                        (id,deskId,name,type,x,y,accessPassword,createdBy,parentId)
                        VALUES
                        (?,?,?,?,?,?,?,?,?)
                        `).run(id,item.deskId,item.name,item.type,item.x,item.y,hashPswrd,userId,item.parentId);
                        const arrayOfUserId = this.db.prepare(`
                        SELECT userId FROM deskAccess
                        WHERE deskId = ?    
                        `).all(item.deskId) as {userId : string}[];
                        arrayOfUserId.forEach(object => {
                            this.db.prepare(`
                            INSERT INTO itemUpdates
                            (itemId,userId,lastModified,lastViewed)
                            VALUES
                            (?,?,?,?)
                            `).run(id,object.userId,Date.now(),0)                    
                        });
                        const newItem = this.db.prepare(`
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
        }

        updateItemById(
        userId : string,
        {deskId ,
        name ,
        type ,
        x  ,
        y ,
        accessPassword ,
        parentId ,
        id ,
        createdBy } : Item
        ): Omit<Item,'creatorColor'>{
                const myTransaction = this.db.transaction(()=>{
                    this.db.prepare(`
                        UPDATE items SET
                        deskId = ?,
                        name=?,
                        type = ?,
                        x= ?,
                        y=?,
                        accessPassword = ?,
                        parentId = ?
                        WHERE id = ?
                        `).run(deskId,name,type,x,y,accessPassword,parentId,id);     
                        this.db.prepare(`
                            UPDATE itemUpdates SET
                            lastModified = ?
                            WHERE itemId = ?
                            `).run(Date.now(),id)
                        this.db.prepare(`
                            UPDATE itemUpdates SET
                            lastViewed = ?
                            WHERE (userId = ? AND itemId = ?)
                        `).run(Date.now(),userId,id);
                    })
                    myTransaction();
                    return {createdBy ,
                        deskId ,
                        name ,
                        type,
                        x ,
                        y ,
                        accessPassword ,
                        parentId ,
                        id }
            }
        
        deleteItemById(id: string): null {
                this.db.prepare(`
                    DELETE FROM items
                    WHERE id = ?
                    `).run(id)
                    return null;
        }

        getAllItemByDeskId(deskId : string) : Item[]|null{
                const arrayOfItems = this.db.prepare(`
                    SELECT items.*, users.userColor as creatorColor,
                    users.userName as creatorName
                    FROM items
                    LEFT JOIN users ON items.createdBy = users.id
                    WHERE items.deskId = ?
                    `).all(deskId) as Item[] |null
                return arrayOfItems;
        }
}

export const itemServices =  new ItemsServices(db)

