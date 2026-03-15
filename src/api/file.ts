const BASE_URL = 'http://localhost:3000'
import type { Item, ItemUpdateType } from "../../shared/types"
import { authHeaders , authHeadersMultipart} from "./user";


////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////// FILES API CALLS ////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////

//////////////////////////////////////// UPLOAD FILE IN DISC /////////////////////////////////////////
export async function uploadFile(item : Omit<Item,'creatorColor'|'id'>, file : File) : Promise<Item|null>{
    try{
        const formData = new FormData();
        formData.append('file',file);
        formData.append('deskId', item.deskId)
        formData.append('name', item.name)
        formData.append('type', item.type)
        formData.append('x', String(item.x))     // ← FormData only accepts strings!
        formData.append('y', String(item.y))
        formData.append('parentId', item.parentId ?? '')
        const result = await fetch(`${BASE_URL}/files/upload`,{
            method : 'POST',
            headers : authHeadersMultipart(),
            body : formData
        })
        const newItem = await result.json();
        return newItem;
    }catch(error){
        return null;
    }
}
//////////////////////////////////////// DELETE FILE /////////////////////////////////
export async function deleteFile(id : string){
    try{
        const result = await fetch(`${BASE_URL}/files/delete/${id}`,{
            method : 'DELETE',
            headers : authHeaders()
        })
    }catch(error){
        console.log('fail to delete file');
    }
}

//////////////////////////////DOWNLOAD FILE //////////////////////////////////
export async function downloadFile(id: string): Promise<void>{
    try{
        const result = await fetch(`${BASE_URL}/files/download/${id}`,{
            method: 'GET',
            headers: authHeaders()
        })
        const blob = await result.blob()             
        const url = URL.createObjectURL(blob)        
        const a = document.createElement('a')        
        a.href = url
        a.download = ''                              
        a.click()                                    
        URL.revokeObjectURL(url)                     
    }catch(error){
        console.log('download failed')
    }
}

////////////////////////// UPDATE FILE WITH DOWNLOAD CONTENT //////////////////
export async function updateFile(id : string ,file : File) : Promise<Item|null>{
    try{
        const formData = new FormData();
        formData.append('file',file);
        const result = await fetch(`${BASE_URL}/files/${id}`,{
            method : 'PATCH',
            headers : authHeadersMultipart(),
            body : formData
        })
        return await result.json() ?? null;
    }catch(error){
        console.log('failure');
        return null
    }
}


