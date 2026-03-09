import { createContext, useState, type ReactNode } from "react";
import type { UserContextType,User } from "../../shared/types";
import { loginUser } from "../api/user";


export const UserContext = createContext<UserContextType|null>(null)
/////////////////////////////MOCK FOR BUILDING ///////////////////////////////
const mockUser = {
    id: "user0",
    name: "Simon",
    userName: "simon",
    mail: "simon@mail.com",
    accountType: "admin" as const,
    userColor: "#FF5733",
    friendList: [],
    notif: []
}

// export function UserProvider({children} : {children : ReactNode}){
//     const [user,setUser] = useState<null|Omit<User,'password'>>(mockUser);
//     const [logged,setLogged] = useState<boolean>(false);
//     function login(mail : User['mail'],password :string){
//         setUser(mockUser);
//         setLogged(true);
//     }
//     function logout(){
//         setUser(null);
//         setLogged(false)
//     }
//     return(
//         <UserContext.Provider value = {{user,logged,login,logout}}>
//             {children}
//         </UserContext.Provider>
//     )
// }

//////////////////////////////END OF MOCK /////////////////////////////



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
