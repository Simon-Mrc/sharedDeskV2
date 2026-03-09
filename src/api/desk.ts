const BASE_URL = 'http://localhost:3000'
import { authHeaders } from "./user"

///////////////////////////////// CREATE DESK ///////////////////////////////
export async function createDesk(name : string){
    try{
        const response = await fetch(`${BASE_URL}/desks`,{
            method : 'POST',
            headers : authHeaders(),
            body : JSON.stringify({name})
        })
        console.log(response);
        return await response.json();
    }catch(error){
        console.log('failed to access db')
    }
}

///////////////////////////////// GET DESK BY ID ///////////////////////////////
export async function getDeskById(id : string){
    try {
        const response = await fetch(`${BASE_URL}/desks/${id}`,{
            method : 'GET',
            headers : authHeaders()
        })
        const desk = await response.json();
        console.log(desk);
        return desk;
    }catch(error){
        console.log('404 DESK NOT FOUND BOY')
    }
}