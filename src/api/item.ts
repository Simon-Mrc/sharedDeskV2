const BASE_URL = 'http://localhost:3000'
import type { Item } from "../../shared/types"
import { authHeaders } from "./user"

export async function getItemByDeskId (deskId : string) : Promise <Item[]|undefined |null> {
    try{
        const result = await fetch(`${BASE_URL}/items/desks/${deskId}`,{
            method : 'GET',
            headers : authHeaders()
        })
        const arrayOfItem = (await result.json()) as Item[]|null;
        console.log(arrayOfItem);
        return arrayOfItem;
    }catch(error){
        console.log('get a life')
    }
}

export async function createItem(item : Omit<Item,'id'>) : Promise <Item|undefined |null>{
    try{
        const result = await fetch(`${BASE_URL}/items`,{
            method : 'POST',
            headers : authHeaders(),
            body : JSON.stringify(item)            
        })
        const newItem = await result.json();
        console.log(newItem);
        return newItem;
    }catch(error){
        console.log('fail to access db');
    }
}

export async function getItemById(id : string) : Promise<Item|null|undefined>{
    try{
        const result = await fetch(`${BASE_URL}/items/${id}`,{
            method : 'GET',
            headers : authHeaders()
        })
        const item = await result.json();
        console.log(item);
        return item
    }catch(error){
        console.log('there is no existing item with this id ')
    }
}

export async function updateItem(item : Item){
    try{
        const result = fetch(`${BASE_URL}/items/${item.id}`,{
            method : 'PUT',
            headers : authHeaders(),
            body : JSON.stringify(item)
        })
        console.log('update success')
    }catch(error){
        console.log('fail to access db')
    }
}