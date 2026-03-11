import { useContext, useState, type JSX } from "react";
import { updateItem } from "../api/item";
import type { Item } from "../../shared/types";
import { DeskContext } from "../context/DeskContext";

export function NamePrompt({onClose, item} : {onClose :()=>void, item: Item}) : JSX.Element{
    const [name , setName] = useState<string>(item.name);
    const deskContext = useContext(DeskContext);
    const arrayOfItem = deskContext?.items;
    async function handleUpdate(){
        const updatedItem = {...item, name : name}
        try{
            updateItem(updatedItem);
            const newArray = arrayOfItem?.map((i)=>i.id === updatedItem.id ? updatedItem : i )
            deskContext?.setAllItems(newArray ?? null);
        }catch(error){
            console.log('fail to access db')
        }
        onClose()
    }
    return(
    <div className="overlay">
        <div className="PopupWithBlurr">
            <button onClick={onClose}>✕</button>
            <h2 className="popup-title">About to change item name !</h2>
            <input className="ModernInput"
             onChange={(input)=>setName(input.target.value)}
             placeholder="Enter a new name"/>
             <button onClick={()=>handleUpdate()}> Change Name</button>
        </div>
    </div>
    )

}


export function PasswordPrompt({onClose, item} : {onClose :()=>void, item: Item}) : JSX.Element{
    const [password , setPassword] = useState<string|null>(null);
    const deskContext = useContext(DeskContext);
    const arrayOfItem = deskContext?.items;
    async function handleUpdate(){
        const updatedItem = {...item, accessPassword : password}
        try{
            console.log(updatedItem);
            updateItem(updatedItem);
            const newArray = arrayOfItem?.map((i)=>i.id === updatedItem.id ? updatedItem : i )
            deskContext?.setAllItems(newArray ?? null);
        }catch(error){
            console.log('fail to access db')
        }
        onClose()
    }
    return(
    <div className="overlay">
        <div className="PopupWithBlurr">
            <button onClick={onClose}>✕</button>
            <h2 className="popup-title">About to change item password !</h2>
            <input className="ModernInput" type="password"
             onChange={(input)=>setPassword(input.target.value)}
             placeholder="Enter a new password"/>
             <button onClick={()=>handleUpdate()}> Change password</button>
        </div>
    </div>
    )

}