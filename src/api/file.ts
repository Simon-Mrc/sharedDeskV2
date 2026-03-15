const BASE_URL = 'http://localhost:3000'
import type { Item, ItemUpdateType } from "../../shared/types"
import { authHeaders } from "./user"
export function authHeadersMultipart(){
    const token = localStorage.getItem('token');
    return {
        'Authorization': `Bearer ${token}`
        // NO Content-Type! browser sets it automatically!
    }
}

////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////// FILES API CALLS ////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////

//////////////////////////////////////// UPLOAD FILE IN DISC /////////////////////////////////////////
export function uploadFile(item : Omit<Item,'creatorColor'|'id'>, file : File) : Promise<Item|null>{
    try{

    }
}


// const BASE_URL = 'http://localhost:3000'
// import type { Item } from "../../shared/types"
// import { authHeaders, authHeadersMultipart } from "./user"

// // UPLOAD
// export async function uploadFile(
//     item: Omit<Item,'creatorColor'|'id'>,
//     file: File                              // ← native browser File object
// ): Promise<Item|null>{
//     try{
//         const formData = new FormData()
//         formData.append('file', file)            // ← the actual file
//         formData.append('deskId', item.deskId)
//         formData.append('name', item.name)
//         formData.append('type', item.type)
//         formData.append('x', String(item.x))     // ← FormData only accepts strings!
//         formData.append('y', String(item.y))
//         formData.append('parentId', item.parentId ?? '')

//         const result = await fetch(`${BASE_URL}/files/upload`,{
//             method: 'POST',
//             headers: authHeadersMultipart(),     // ← no Content-Type!
//             body: formData
//         })
//         return await result.json()
//     }catch(error){
//         return null
//     }
// }

// // DOWNLOAD
// export async function downloadFile(itemId: string): Promise<void>{
//     try{
//         const result = await fetch(`${BASE_URL}/files/download/${itemId}`,{
//             method: 'GET',
//             headers: authHeaders()
//         })
//         const blob = await result.blob()               // ← file comes back as blob!
//         const url = URL.createObjectURL(blob)          // ← create temp browser URL
//         const a = document.createElement('a')         // ← fake anchor tag
//         a.href = url
//         a.download = ''                                // ← triggers download dialog
//         a.click()                                      // ← simulate click
//         URL.revokeObjectURL(url)                       // ← cleanup temp URL
//     }catch(error){
//         console.log('download failed')
//     }
// }

// // DELETE
// export async function deleteFile(itemId: string): Promise<void>{
//     try{
//         await fetch(`${BASE_URL}/files/${itemId}`,{
//             method: 'DELETE',
//             headers: authHeaders()
//         })
//     }catch(error){
//         console.log('delete failed')
//     }
// }