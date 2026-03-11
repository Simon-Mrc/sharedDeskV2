import { useContext, useState, type JSX } from "react";
import { deleteItem, updateItem } from "../../api/item";
import type { Item } from "../../../shared/types";
import { DeskContext } from "../../context/DeskContext";
import { UserContext } from "../../context/UserContext";

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


export function DeletePrompt({onClose , item} : {onClose : ()=>void , item : Item}) : JSX.Element{
    const deskContext = useContext(DeskContext);
    const userContext = useContext(UserContext);
    const [input,setInput] = useState<string>('');
    const [error , setError] = useState<string>('');
    async function deleteHandler(){
        if(input === item.name && userContext?.user?.id === item.createdBy){
            await deleteItem(item.id);
            await deskContext?.refreshItems();
            onClose()
        }else{
            setError('You have to be the creator in order to delete this !')
        }
    }
    return(
    <div className="overlay">
        <div className="PopupWithBlurr">
            <button onClick={onClose}>✕</button>
            <h2 className="popup-title">{`enter ${item.name} to confirm the delete`}</h2>
            <input className="ModernInput" 
            onChange={(input)=>setInput(input.target.value)}
            placeholder={`enter ${item.name} to confirm`}/>
            {error && <span className="error">{error}</span>}
            <button onClick={()=>deleteHandler()}> Delete Item</button>
            <button onClick={()=>onClose()}> Cancel Delete</button>
        </div>
    </div>
    )
}