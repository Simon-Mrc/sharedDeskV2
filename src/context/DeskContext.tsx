import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import type { Desk, DeskContextType, Item } from "../../shared/types";
import { UserContext } from "./UserContext";
import { getAllDesk } from "../api/deskAccess";
import { createItem, getItemByDeskId } from "../api/item";
import { getDeskById } from "../api/desk";

export const DeskContext = createContext<DeskContextType|null>(null)

///////////////////////////// DESK CONTEXT PROVIDER //////////////////////////
export function DeskProvider({children} : {children : ReactNode}){
        const [currentDesk , setCurrentDesk] = useState<Desk|null>(null);
        const [items , setItems] = useState<DeskContextType['items']|null>(null);
        const [loaded , setLoaded] = useState<boolean>(false);
        const [desks , setDesks] = useState<Desk[]|null>(null);
        const userContext = useContext(UserContext);
///////////////////////// REFRESH ALL DESK USER HAS ACCESS TO //////////////////////
        async function refreshDesks(){
            console.log('test alldesk handler');
            setDesks(await getAllDesk());
        }
        async function allItemHandler(deskId: string){
            setItems(await getItemByDeskId(deskId)as Item[]);
            setLoaded(true);
        }
//////////////////////// REFRESH ITEM ON DESK CHANGES ///////////////////
        useEffect(()=>{
            if(currentDesk?.id){allItemHandler(currentDesk.id);}
        },[currentDesk]);
//////////////////////// REFRESH DESKS ON USER CHANGES ///////////////////
        useEffect(()=>{
            if(userContext?.user){refreshDesks();}
        },[userContext?.user])

        async function switchDesk(deskId : string){
            setCurrentDesk(await getDeskById(deskId))
        }
///////////////////////// CREATE ITEM FUNCTION (DOM AND DB) //////////////////////
        async function createItemDesk (item : Omit<Item,'id'>){
            const newItem = await createItem(item);
            if(newItem !=undefined && newItem!= null){
                if(items){
                    const newArray = [...items,newItem];
                    setItems(newArray);
                }else{
                    setItems([newItem]);
                }
            }
        }
///////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////// PROVIDES !! ////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////
        return(
            <DeskContext.Provider value={{currentDesk,desks,items,loaded,switchDesk,refreshDesks,createItemDesk}}>
                {children}
            </DeskContext.Provider>
        )
       
}
