import { createContext, useState, type ReactNode } from "react";
import type { UserContextType,User } from "../../shared/types";
import { loginUser } from "../api/user";


export const UserContext = createContext<UserContextType|null>(null)

///////////////////////////// USER CONTEXT PROVIDER //////////////////////////
export function UserProvider({children} : {children : ReactNode}){
    const [user,setUser] = useState<null|Omit<User,'password'>>(null);
    const [logged,setLogged] = useState<boolean>(false);
    async function login(mail : User['mail'],password :string){
        try{
            const {user,token} = await loginUser({mail,password});
            if(token){
                localStorage.setItem('token',token);
                setUser(user);
                setLogged(true);
            }
        }catch(error){
            console.log('wrong email or password')
            setLogged(false);
        }
    }
    function logout(){
        setUser(null);
        setLogged(false);
        localStorage.removeItem('token');
    }
    return(
        <UserContext.Provider value = {{user,logged,login,logout}}>
            {children}
        </UserContext.Provider>
    )
}
