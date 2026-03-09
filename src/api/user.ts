const BASE_URL = 'http://localhost:3000'

export function authHeaders() {
    const token = localStorage.getItem('token')
    return {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
    }
}

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
        const result = await response.json()
        return result;
    }catch(error){
        console.log({error : 'VerifyURL must be wrong'})
        return {error : 'VerifyURL must be wrong'}
    }
}

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
    const result = await response.json()
    console.log(result);
    return result;
    }catch(error){
        console.log('Wrong Email or Password')
    }
}

