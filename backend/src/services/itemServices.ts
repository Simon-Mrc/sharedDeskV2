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

        createItem()

    
}

export const itemServices = new ItemsServices(db)

