const BASE_URL = 'http://localhost:3000'
import { authHeaders } from "./user"

export async function createDesk(deskData : {
    name : string;
}){
    try{
        const response = await fetch(`${BASE_URL}/desks`,{
            method : 'POST',
            headers : authHeaders(),
            body : JSON.stringify(deskData)
        })
        console.log(response);
        return response;
    }catch(error){
        console.log('failed to access db')
    }
}

