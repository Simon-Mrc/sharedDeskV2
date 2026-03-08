import { createContext, useContext, useState, type ReactNode } from "react";
import type { Desk, DeskContextType, Item } from "../../shared/types";
import { UserContext } from "./UserContext";

export const DeskContext = createContext<DeskContextType|null>(null)

/////////////////////////////MOCK FOR BUILDING ///////////////////////////////
const mockDesk = {
    id: "desk0",
    name: "My First Desk",
    ownerId: "user0",
    urlLink: null,
    accessPassword: null,
    createdAt: "2026-01-01"
}
const mockDesk2 = {
    id: "desk1",
    name: "My second Desk",
    ownerId: "user0",
    urlLink: null,
    accessPassword: null,
    createdAt: "2026-01-01"
}

const mockItems = [
    { id: "item0", deskId: "desk0", name: "my folder", type: 'folder', x: 100, y: 150, parentId: null, createdBy: "user0", creatorColor: "#FF5733" },
    { id: "item1", deskId: "desk0", name: "my file", type: 'file', x: 300, y: 200, parentId: null, createdBy: "user0", creatorColor: "#FF5733" },
] as Item[];
const mockItems2 = [
    { id: "item2", deskId: "desk1", name: "my folder", type: 'folder', x: 100, y: 150, parentId: null, createdBy: "user0", creatorColor: "#FF5733" },
    { id: "item3", deskId: "desk1", name: "my file", type: 'file', x: 300, y: 200, parentId: 'item2', createdBy: "user0", creatorColor: "#FF5733" }
]as Item[];


export function DeskProvider({children} : {children : ReactNode}){
    const [currentDesk , setCurrentDesk] = useState<Desk|null>(mockDesk)
    const [items , setItems] = useState<DeskContextType['items']|null>(mockItems);
    const [loaded , setLoaded] = useState<boolean>(true);
    const [desks , setDesks] = useState([mockDesk,mockDesk2])

    async function switchDesk (deskId : Desk['id']){
        if(currentDesk?.id === mockDesk.id){ 
            setCurrentDesk(mockDesk2);
            setItems(mockItems2);        
        }else{
            setCurrentDesk(mockDesk);
            setItems(mockItems);
        }
    
    }
    return(
        <DeskContext.Provider value = {{currentDesk,desks,items,loaded,switchDesk}}>
            {children}
        </DeskContext.Provider>
    )
 
}

/////////////////////////////END MOCK FOR BUILDING ///////////////////////////////


// export function DeskProvider({children} : {chidren : ReactNode}){
//     const [currentDesk , setCurrentDesk] = useState<Desk|null>(null)
//     const [items , setItems] = useState<DeskContextType['items']|null>(null);
//     const [loaded , setLoaded] = useState<boolean>(false);
//     const [allDesks , setAllDesks] = useState<Desk[]|null>(null);
//     const userContext = useContext(UserContext);
//     if(userContext?.user){
//         try{
//             let alldesks = await getAllDeskByUserId(userContext?.user.id);
//             setAllDesks(allDesks);
//         }
//     }

//     async function switchDesk (deskId : Desk['id']){
//         try{
//             let desk = await getDesk<Desk|{error : string}>(deskId);
//         if(!desk.error){
//             setCurrentDesk(desk);
//             let items = await getItemsByDeskId<Item[]|null>(desk.id)
//             setItems(items);
//             setLoaded(true);
//         }else{
//             console.log('The desk you re looking doesn t exist anymore')
//         }
//         }catch(error){
//             console.log('couldn t connect to db');
//         }
//     }
//     return(
//         <DeskContext.Provider value = {{currentDesk,items,loaded,switchDesk}}>
//             {children}
//         </DeskContext.Provider>
//     )
 
// }