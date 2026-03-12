import { createContext, useState, type ReactNode } from "react";
import type { UserContextType,User } from "../../shared/types";
import { loginUser } from "../api/user";


export const UserContext = createContext<UserContextType|null>(null)

///////////////////////////// USER CONTEXT PROVIDER //////////////////////////
export function UserProvider({children} : {children : ReactNode}){
    const [user,setUser] = useState<Omit<User,'password'>|null>(null);
    const [logged,setLogged] = useState<boolean>(false);
///////////////////////////// LOGIN ////////////////////////////
    async function login(mail : User['mail'],password :string){
        try{
            const {user,token} = await loginUser({mail,password});
            if(token && user ){
                localStorage.setItem('token',token);
                setUser(user);
                setLogged(true);
            }
        }catch(error){
            console.log('wrong email or password')
            setLogged(false);
        }
    }
///////////////////////////// LOGOUT /////////////////////////////
    function logout(){
        setUser(null);
        setLogged(false);
        localStorage.removeItem('token');
    }
////////////////////////////// SETNEWUSER /////////////////////////
    function setNewUser (user : Omit<User,'password'>){
        setUser(user);
    }

////////////////////////////// PROVIDES ////////////////////////////
    return(
        <UserContext.Provider value = {{user,logged,login,logout,setNewUser}}>
            {children}
        </UserContext.Provider>
    )
}
