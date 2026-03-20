import type { Item, ItemUpdateType } from "../../shared/types"
import { authHeaders } from "./user"
const BASE_URL = 'http://localhost:3000'

////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////// ITEMS API CALLS ////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////
export class ItemsApi{
    private BASE_URL : string;
    constructor(BASE_URL : string){
        this.BASE_URL = BASE_URL
    }

    async getItemByDeskId(deskId : string) : Promise <Item[]|undefined |null> {
    try{
        const result = await fetch(`${this.BASE_URL}/items/desks/${encodeURIComponent(deskId)}`,{
            method : 'GET',
            headers : authHeaders()
        })
        if(!result.ok) throw new Error(`HTTP error : ${result.status}`);
        const arrayOfItem = (await result.json()) ;
        return arrayOfItem;
    }catch(error){
        console.log(error);
        throw error;
    }
    }

    async createItem(item : Omit<Item,'id'>) : Promise <Item|undefined |null>{
    try{
        const result = await fetch(`${this.BASE_URL}/items`,{
            method : 'POST',
            headers : authHeaders(),
            body : JSON.stringify(item)            
        })
        if(!result.ok) throw new Error(`HTTP error : ${result.status}`);
        const newItem = await result.json();
        return newItem;
    }catch(error){
        console.log(error);
        throw error;;
    }
    }

    async getItemById(id : string) : Promise<Item|null|undefined>{
    try{
        const result = await fetch(`${this.BASE_URL}/items/${id}`,{
            method : 'GET',
            headers : authHeaders()
        })
        if(!result.ok) throw new Error(`HTTP error : ${result.status}`);
        const item = await result.json();
        return item
    }catch(error){
        console.log('there is no existing item with this id ');
        throw error;
    }
    }

    async updateItem(item : Item) : Promise<Omit<Item,'creatorColor'>|null|undefined>{
    try{
        const result = await fetch(`${this.BASE_URL}/items/${item.id}`,{
            method : 'PUT',
            headers : authHeaders(),
            body : JSON.stringify(item)
        })
        if(!result.ok) throw new Error(`HTTP error : ${result.status}`);
        return await result.json();
    }catch(error){
        console.log('fail to access db');
        throw error;
    }
    }

    async deleteItem(itemId : string){
    try{
        const result = await fetch(`${this.BASE_URL}/items/${itemId}`,{
            method : 'DELETE',
            headers : authHeaders()
        })
        if(!result.ok) throw new Error(`HTTP error : ${result.status}`);
        console.log('item Deleted')
    }catch(error){
        console.log('Fail to access db');
        throw error;
    }
    }

    async updateViewed(itemId : string){
    try{
        const result = await fetch(`${this.BASE_URL}/itemUpdates/${itemId}`,{
            method : 'PUT',
            headers : authHeaders()
        })
        if(!result.ok) throw new Error(`HTTP error : ${result.status}`);
        console.log('uptodate');
    }catch(error){
        console.log('fails to access db ');
        throw error;
    }
    }

    async getAllItemFromUpdate(): Promise<Omit<ItemUpdateType[],'deskId'>|null>{
    try{
        const arrayOfItem = await fetch(`${this.BASE_URL}/itemUpdates/allItems`,{
            method : 'GET',
            headers : authHeaders()
        })
        if(!arrayOfItem.ok) throw new Error(`HTTP error : ${arrayOfItem.status}`);
        const result = await arrayOfItem.json();
        return result;
    }catch(error){
        console.log(error);
        throw error;
    }
    }

    async getAllUpdatesAndDesk() : Promise<ItemUpdateType[]|null>{
    try{
        const arrayOfItem = await fetch(`${this.BASE_URL}/itemUpdates/desksId/allItems`,{
            method : 'GET',
            headers : authHeaders()
        })
        if(!arrayOfItem.ok) throw new Error(`HTTP error : ${arrayOfItem.status}`);
        const result = await arrayOfItem.json();
        return result;
    }catch(error){
        console.log(error);
        throw error;
    }
    }
}

export const itemsApi = new ItemsApi(BASE_URL);


////////////////////////////////////////GET ALL ITEMS FROM DESKID /////////////////////////////////////////
export async function getItemByDeskId (deskId : string) : Promise <Item[]|undefined |null> {
    try{
        const result = await fetch(`${BASE_URL}/items/desks/${encodeURIComponent(deskId)}`,{
            method : 'GET',
            headers : authHeaders()
        })
        const arrayOfItem = (await result.json()) as Item[]|null;
        return arrayOfItem;
    }catch(error){
        console.log('get a life')
    }
}
//////////////////////////////////////// CREATE ITEM  /////////////////////////////////////////
export async function createItem(item : Omit<Item,'id'>) : Promise <Item|undefined |null>{
    try{
        const result = await fetch(`${BASE_URL}/items`,{
            method : 'POST',
            headers : authHeaders(),
            body : JSON.stringify(item)            
        })
        const newItem = await result.json();
        return newItem;
    }catch(error){
        console.log('fail to access db');
    }
}

////////////////////////////////////////GET ALL ITEMS BY ID /////////////////////////////////////////
export async function getItemById(id : string) : Promise<Item|null|undefined>{
    try{
        const result = await fetch(`${BASE_URL}/items/${id}`,{
            method : 'GET',
            headers : authHeaders()
        })
        const item = await result.json();
        return item
    }catch(error){
        console.log('there is no existing item with this id ')
    }
}

//////////////////////////////////////// UPDATE ITEM /////////////////////////////////////////
export async function updateItem(item : Item){
    try{
        const result = await fetch(`${BASE_URL}/items/${item.id}`,{
            method : 'PUT',
            headers : authHeaders(),
            body : JSON.stringify(item)
        })
        console.log('update success')
    }catch(error){
        console.log('fail to access db')
    }
}

//////////////////////////////////////// DELETE ITEM /////////////////////////////////////////
export async function deleteItem(itemId : string){
    try{
        const result = await fetch(`${BASE_URL}/items/${itemId}`,{
            method : 'DELETE',
            headers : authHeaders()
        })
        console.log('item Deleted')
    }catch(error){
        console.log('Fail to access db')
    }
}
//////////////////////////////////////// UPDATE LAST VIEWED /////////////////////////////////////////
export async function updateViewed(itemId : string){
    try{
        const result = await fetch(`${BASE_URL}/itemUpdates/${itemId}`,{
            method : 'PUT',
            headers : authHeaders()
        })
        console.log('uptodate');
    }catch(error){
        console.log('fails to access db ')
    }
}

///////////////////////////// GET ALL ITEM FROM ITEMUPDATES FOR USER /////////////////////////
export async function getAllItemFromUpdate(): Promise<Omit<ItemUpdateType[],'deskId'>|null>{
    try{
        const arrayOfItem = await fetch(`${BASE_URL}/itemUpdates/allItems`,{
            method : 'GET',
            headers : authHeaders()
        })
        const result = await arrayOfItem.json();
        return result;
    }catch(error){
        return null;
    }
}

///////////////////////////// GET ALL ITEM FROM ITEMUPDATES FOR USER  BUT JOINING DESKID /////////////////////////
export async function getAllUpdatesAndDesk() : Promise<ItemUpdateType[]|null>{
    try{
        const arrayOfItem = await fetch(`${BASE_URL}/itemUpdates/desksId/allItems`,{
            method : 'GET',
            headers : authHeaders()
        })
        const result = await arrayOfItem.json();
        return result;
    }catch(error){
        return null
    }
}