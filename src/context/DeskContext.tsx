import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { type ItemUpdateType, type Desk, type DeskContextType, type Item } from "../../shared/types";
import { UserContext } from "./UserContext";
import { getAllDesk, getAllUserNColor } from "../api/deskAccess";
import { createItem,  getAllUpdatesAndDesk, getItemByDeskId, updateViewed } from "../api/item";
import { getDeskById } from "../api/desk";
import { createNote } from "../api/note";

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
            const allDesks = await getAllDesk();
            setDesks(allDesks);
            return allDesks;
        }
        async function allItemHandler(deskId: string){
            const allItems = await getItemByDeskId(deskId)as Item[]; 
            setItems(allItems);
            setLoaded(true);
            return (allItems);
        }
//////////////////////// REFRESH ITEM ON DESK CHANGES ///////////////////
        useEffect(()=>{
            if(currentDesk?.id){allItemHandler(currentDesk.id);}
        },[currentDesk,userContext?.user?.userColor]);
//////////////////////// REFRESH DESKS ON USER CHANGES ///////////////////
        useEffect(()=>{
            if(!userContext?.user){
                setDesks(null);
                setCurrentDesk(null);
                setItems(null);
            }
            else{
                async function init(){
                    const allDesks = await refreshDesks();
                    setDesks(allDesks);
                    if(allDesks){
                        setCurrentDesk(allDesks[0])
                        await switchDesk(allDesks[0].id);
                        const allItems = await allItemHandler(allDesks[0].id);
                        setItems(allItems);
                    }
                }
                init();
            }           
        },[userContext?.user?.id])

        async function switchDesk(deskId : string){
            const currentDeskFromDb = await getDeskById(deskId);
            const allUsersNameNColor = await getAllUserNColor(deskId);
            if(currentDeskFromDb){
                setCurrentDesk({...currentDeskFromDb, allUsersNameNColor: allUsersNameNColor??undefined})
            }
        }
///////////////////////// CREATE ITEM FUNCTION (DOM AND DB) //////////////////////
        async function createItemDesk (item : Omit<Item,'id'>) : Promise <Item |null> {
            let newItem;
            if(item.type === 'note'){
                newItem = await createNote(item,'');
                newItem = newItem?.item
                if(newItem !=undefined && newItem!= null){
                    if(items){
                        const newArray = [...items,newItem];
                        setItems(newArray);
                    }else{
                        setItems([newItem]);
                    }
                }
            }else{
                newItem = await createItem(item);
                if(newItem !=undefined && newItem!= null){
                    if(items){
                        const newArray = [...items,newItem];
                        setItems(newArray);
                    }else{
                        setItems([newItem]);
                    }
                }
            }
            return newItem? newItem : null;
        }

///////////////////////////// UPDATE ITEM LIST AND UPDATE JUST 1 ITEM //////////////////////
    function setAllItems(items : DeskContextType['items'] ){
        setItems(items);
    };

    function setOneItem(item : Item){
        items &&
        setAllItems(items.map((object)=> object.id === item.id ? item : object))
    }
//////////////////// FIND 1 ITEM HELPER FUNCTION ////////////////
function findOneItem(itemId : Item['id']) : Item{
    const item = items?.find((object)=>object.id === itemId);
    if (!item) throw new Error(`Item with id ${itemId} not found`);
    return item  
}
///////////////////////// REFRESH ALL ITEMS //////////////////////
async function refreshItems(){
        if(currentDesk){
            setItems(await getItemByDeskId(currentDesk.id)as Item[]);
        }
}
///////////////////////// REFRESH ALL ITEM FOR NOTIFS /////////////////
async function getAllUpdates(){
    setItemUpdates(await getAllUpdatesAndDesk());
}
useEffect(()=>{
    if(userContext?.user){getAllUpdates();}
},[currentDesk])

/////////////////////////////////// ISNEW HELPER FUNCTION //////////////////////
function isNew(itemId : string) : boolean{
    const goodItem = itemUpdates?.find((object)=>itemId===object.itemId);
    if(goodItem &&(goodItem?.lastModified>goodItem?.lastViewed)){return true}
    else{return false}
}
//////////////////////////////UPDATES ALL HELPER FUNCTION //////////////////////////////
async function markAsViewed(itemId: string, forced : boolean=false){
    if (forced || isNew(itemId)){
        await updateViewed(itemId);
        setItemUpdates(prev => prev?.map(object => 
            object.itemId === itemId 
            ? {...object, lastViewed: Date.now()} 
            : object
        ) ?? null)
    }
}
/////////////////////////////////// CONTAINS NEW HELPER FUNCTION FOR DESK NOTIF /////////////////
function containsNew(deskId : string) : boolean{
    const itemExists = itemUpdates?.find((object)=>(object.deskId === deskId && isNew(object.itemId)));
    return itemExists ?  true : false ;
    
///////// 2 OTHER WORKING OPTIONS TO KEEP IN MIND ////// WILL TRY TO USE ALL FROM TIME TO TIME ///////////
}

///////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////// PROVIDES !! ////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////
        return(
            <DeskContext.Provider value={{currentDesk,desks,items,loaded,itemUpdates,switchDesk,refreshDesks,createItemDesk,setAllItems,refreshItems,isNew,markAsViewed,containsNew, setOneItem, findOneItem}}>
                {children}
            </DeskContext.Provider>
        )
       
}
