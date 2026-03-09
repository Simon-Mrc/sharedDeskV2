const BASE_URL = 'http://localhost:3000'
import { authHeaders } from "./user"

export async function getAllDesk(){
    try{
        const response = await fetch(`${BASE_URL}/deskAccess/desks`,{
            method : 'GET',
            headers : authHeaders(),
        })
        const result = await response.json();
        console.log(result);
        return result;
    }catch(error){
        console.log('User has desk to access')
    }

}
