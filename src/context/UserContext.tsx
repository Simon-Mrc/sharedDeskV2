import { createContext, useState, type ReactNode } from "react";
import type { UserContextType,User } from "../../shared/types";


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

export function UserProvider({children} : {children : ReactNode}){
    const [user,setUser] = useState<null|Omit<User,'password'>>(mockUser);
    const [logged,setLogged] = useState<boolean>(true);
    function login(mail : User['mail'],password :string){
        setUser(mockUser);
        setLogged(true);
    }
    function logout(){
        setUser(null);
        setLogged(false)
    }
    return(
        <UserContext.Provider value = {{user,logged,login,logout}}>
            {children}
        </UserContext.Provider>
    )
}

//////////////////////////////END OF MOCK /////////////////////////////



// export function UserProvider({children} : {children : ReactNode}){
//     const [user,setUser] = useState<null|Omit<User,'password'>>(null);
//     const [logged,setLogged] = useState<boolean>(false);
//     async function login(mail : User['mail'],password :string){
//         try{
//             const user = getUser(mail,password); // function defined that get user from db if mail and password are ok
//             if(!user.error){
//                 setUser(user);
//                 setLogged(true);
//             }
//         }catch(error){
//             console.log('wrong email or password')
//         }
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
