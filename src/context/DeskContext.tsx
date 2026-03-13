import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { type ItemUpdateType, type Desk, type DeskContextType, type Item } from "../../shared/types";
import { UserContext } from "./UserContext";
import { getAllDesk } from "../api/deskAccess";
import { createItem, getAllItemFromUpdate, getItemByDeskId, updateViewed } from "../api/item";
import { getDeskById } from "../api/desk";

export const DeskContext = createContext<DeskContextType|null>(null)

///////////////////////////// DESK CONTEXT PROVIDER //////////////////////////
export function DeskProvider({children} : {children : ReactNode}){
        const [currentDesk , setCurrentDesk] = useState<Desk|null>(null);
        const [items , setItems] = useState<DeskContextType['items']|null>(null);
        const [loaded , setLoaded] = useState<boolean>(false);
        const [desks , setDesks] = useState<Desk[]|null>(null);
        const [itemUpdates , setItemUpdates] = useState<ItemUpdateType[]|null>(null);
        const userContext = useContext(UserContext);
///////////////////////// REFRESH ALL DESK USER HAS ACCESS TO //////////////////////
        async function refreshDesks(){
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
            setCurrentDesk(null);
            setItems(null);
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

///////////////////////////// UPDATE ITEM LIST //////////////////////
    function setAllItems(items : DeskContextType['items'] ){
        setItems(items);
    }

///////////////////////// REFRESH ALL ITEMS //////////////////////
async function refreshItems(){
        if(currentDesk){
            setItems(await getItemByDeskId(currentDesk.id)as Item[]);
        }
}
///////////////////////// REFRESH ALL ITEM FOR NOTIFS /////////////////
async function getAllUpdates(){
    setItemUpdates(await getAllItemFromUpdate());
}
useEffect(()=>{
    if(userContext?.user){getAllUpdates();}
},[currentDesk,userContext?.user])

/////////////////////////////////// ISNEW HELPER FUNCTION //////////////////////
function isNew(itemId : string) : boolean{
    const goodItem = itemUpdates?.find((object)=>itemId===object.itemId);
    if(goodItem &&(goodItem?.lastModified>goodItem?.lastViewed)){return true}
    else{return false}
}
//////////////////////////////UPDATES ALL HELPER FUNCTION //////////////////////////////
async function markAsViewed(itemId: string){
    if (isNew(itemId)){
        await updateViewed(itemId);
        setItemUpdates(prev => prev?.map(object => 
            object.itemId === itemId 
            ? {...object, lastViewed: Date.now()} 
            : object
        ) ?? null)
    }
}

///////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////// PROVIDES !! ////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////
        return(
            <DeskContext.Provider value={{currentDesk,desks,items,loaded,itemUpdates,switchDesk,refreshDesks,createItemDesk,setAllItems,refreshItems,isNew,markAsViewed}}>
                {children}
            </DeskContext.Provider>
        )
       
}
