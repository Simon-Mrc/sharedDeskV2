const BASE_URL = 'http://localhost:3000'
import { authHeaders } from "./user"

////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////// DESKS ACCESS API CALLS ////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////

////////////////////// GET ALL DESKS USER HAS ACCESS TO /////////////////////
export async function getAllDesk(){
    try{
        const response = await fetch(`${BASE_URL}/deskAccess/desks`,{
            method : 'GET',
            headers : authHeaders(),
        })
        const result = await response.json();
        return result;
    }catch(error){
        console.log('User has no desks to access')
    }
}

///////////////////////// ADD FRIEND TO DESK IF ACCESSTYPE OK /////////////////////
export async function inviteToDesk(friendId : string ,deskId:string) : Promise<{message:string}>{
    try{
        const result = await fetch(`${BASE_URL}/deskAccess/${encodeURIComponent(deskId)}`,{
            method : 'POST',
            headers : authHeaders(),
            body : JSON.stringify({userId :friendId})
        })
        return await result.json()
    }catch(error){
        return {message : 'failed to access db'}
    }
}