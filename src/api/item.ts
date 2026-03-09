const BASE_URL = 'http://localhost:3000'
import type { Item } from "../../shared/types"
import { authHeaders } from "./user"

export async function getItemByDeskId (deskId : string) {
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