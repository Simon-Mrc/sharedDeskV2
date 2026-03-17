import type { User } from "../../shared/types";
const BASE_URL = 'http://localhost:3000'

//////////////////////////// AUTH HEADER FOR NEEDED API CALLS /////////////////////////
export function authHeaders() {
    const token = localStorage.getItem('token')
    return {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
    }
}
///////////////////////// AUTH HEADER THAT DOESN T SPECIFY CONTENT-TYPE FOR DL //////////////////
export function authHeadersMultipart(){
    const token = localStorage.getItem('token');
    return {
        'Authorization': `Bearer ${token}`
        // NO Content-Type! browser sets it automatically!
    }
}
//////////////////////////// PARSE HELPER FOR STRING[] PROPS /////////////////////////
export function parseHelper(user : Omit<User,'password'>|null){
    if(!user){
        return null
    }
    else{
        return {
            ...user,
            notif : typeof user.notif === "string" ? JSON.parse(user.notif) : user.notif,
            friendList : typeof user.friendList === "string" ? JSON.parse(user.friendList) : user.friendList
        }
    }
}

////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////// USERS API CALLS ////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////

//////////////////////////// REGISTER NEW USER /////////////////////////
export async function registerUser(userData : {
    name : string,
    userName : string;
    mail : string;
    password : string
}){
    try{
        const response = await fetch(`${BASE_URL}/users`,{
            method : 'POST',
            headers : {'content-type' : 'application/json'},
            body : JSON.stringify(userData)
        })
        const result = await response.json();
        const safeResult = parseHelper(result);
        return safeResult;
    }catch(error){
        console.log({error : 'VerifyURL must be wrong'})
        return null
    }
}

//////////////////////////// LOGIN CALL /////////////////////////
export async function loginUser(userData : {
    mail : string;
    password : string;
}){
    try{
        const response = await fetch(`${BASE_URL}/users/login`,{
            method : 'POST',
            headers : {'content-type' : 'application/json'},
            body : JSON.stringify(userData)
        }
    )
    const result = await response.json();
    const {user,token} = result;
    const safeResult = parseHelper(user);
    return {user : safeResult,token};
    }catch(error){
        console.log('Wrong Email or Password');
        return {user : null, token : null};
    }
}

//////////////////////////// SEARCH ROUTE ADAPTED FOR STUPID USERS WHO CAN T TYPE  /////////////////////////
export async function getUserBySearch(search : string) : Promise<Omit<User,'password'>[]|null>{
    try{
        const arrayOfFriend = await fetch(`${BASE_URL}/users/search`,{
            method : 'POST',
            headers : authHeaders(),
            body : JSON.stringify({search})
        })
        const result = await arrayOfFriend.json();
        const safeResult = result.map(parseHelper);
        return safeResult;
    }catch(error){
        console.log('fail to access db');
        return null;
    }
}

//////////////////////////// UPDATE USER CALL /////////////////////////
export async function updateUserById(user : Omit<User,'password'>){
    try{
        const result = await fetch(`${BASE_URL}/users/${user.id}`,{
            method : 'PUT',
            headers : authHeaders(),
            body : JSON.stringify(user)
        })
    }catch(error){
        console.log('fail to access db')
        return null;
    }
}

/////////////////////////// GET USER BY ID ////////////////////////
export async function getUserById (id : string) : Promise<Omit<User,'password'> |null>{
    try{
        const result = await fetch(`${BASE_URL}/users/${id}`,{
            method : 'GET',
            headers : authHeaders()
        })
        const user = await result.json();
        const safeUser = parseHelper(user);
        return safeUser;
    }catch(error){
        console.log('fail to access db');
        return null;
    }
}

///////////////////// CHANGE AVATAR ////////////////////////////
export async function changeAvatar(id : string, file:File) : Promise<{avatarFilePath : string} |null>{
    try{
        const formData = new FormData();
        formData.append('file',file);
        const result = await fetch(`${BASE_URL}/users/avatar/${id}`,{
            method : 'PATCH',
            headers : authHeadersMultipart(),
            body : formData
        })
        const avatarFilePath = await result.json();
        return avatarFilePath;
    }catch(error){
        return null;
    }
}