const BASE_URL = 'http://localhost:3000'
import { authHeaders } from "./user"

////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////// DESKS API CALLS ////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////

///////////////////////////////// CREATE DESK ///////////////////////////////
export async function createDesk(name : string){
    try{
        const response = await fetch(`${BASE_URL}/desks`,{
            method : 'POST',
            headers : authHeaders(),
            body : JSON.stringify({name})
        })
        const desk = await response.json();
        if (desk.id){return desk}
        else{return null};
    }catch(error){
        console.log('failed to access db');
        return null
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
        if (desk.id){return desk}
        else{return null};
    }catch(error){
        console.log('404 DESK NOT FOUND BOY');
        return null
    }
}