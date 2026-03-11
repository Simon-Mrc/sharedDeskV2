import { useContext, useState, type JSX } from "react";
import { deleteItem, updateItem } from "../../api/item";
import type { Item } from "../../../shared/types";
import { DeskContext } from "../../context/DeskContext";
import { UserContext } from "../../context/UserContext";

//////////////////////////////////////////////////////////////////////////////////////////
////////////////// ALL JSX FUNCTION FOR OPTION PROMPT ON ITEMS HERE ! //////////////////
//////////////////////////////////////////////////////////////////////////////////////////

//////////////////////////////////// NAME PROMPT ////////////////////////////////////
export function NamePrompt({onClose, item} : {onClose :()=>void, item: Item}) : JSX.Element{
    const [name , setName] = useState<string>(item.name);
    const deskContext = useContext(DeskContext);
    const arrayOfItem = deskContext?.items;
    async function handleUpdate(){
        const updatedItem = {...item, name : name}
        try{
     //////////////////// UPDATE IN DB ///////////////////////////
            updateItem(updatedItem);
    ///////////TAKE ALL ITEM ARRAY AND REPLACE ONLY THE ONE MODIFIED IN DESK CONTEXT ///////////////////
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

//////////////////////////////////// PASSWORD PROMPT ////////////////////////////////////
export function PasswordPrompt({onClose, item} : {onClose :()=>void, item: Item}) : JSX.Element{
    const [password , setPassword] = useState<string|null>(null);
    const deskContext = useContext(DeskContext);
    const arrayOfItem = deskContext?.items;
    async function handleUpdate(){
        const updatedItem = {...item, accessPassword : password}
        try{
        ////////////////////UPDATE IN DB /////////////////
            updateItem(updatedItem);
        ///////// TAKE ALL ITEM ARRAY AND REPLACE THE RIGHT ONE FOR DESKCONTEXT //////////////
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

//////////////////////////////////// DELETE PROMPT ////////////////////////////////////
export function DeletePrompt({onClose , item} : {onClose : ()=>void , item : Item}) : JSX.Element{
    const deskContext = useContext(DeskContext);
    const userContext = useContext(UserContext);
    const [input,setInput] = useState<string>('');
    const [error , setError] = useState<string>('');
    async function deleteHandler(){
        if(input === item.name && userContext?.user?.id === item.createdBy){
        /////// DELETE IN DB //////////
            await deleteItem(item.id);
    ///// HERE WE DON T UPDATE FROM ARRAY BECAUSE IT WOULD HAVE NEEDED RECURSIVE FUNCTION //////
    //// DELETE IS RECURSIVE FOR FILES AND FOLDER AND HANDLE BY FOREIGN KEY IN DB //////
    //// SO REFRESH ITEMS JUST CALL THE NEW ARRAY OF ITEM TO UPDATE DESKCONTEXT /////////
            await deskContext?.refreshItems();
            onClose()
        }else{
            setError('Look better and don t typo ! (you moron)')
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
            {error && 
                 <div className="PopupInside" style={{gridColumn: "1 / -1", textAlign :"center" }}>
                 <span  className="error">{error}</span>
                 </div>
                }
            <button onClick={()=>deleteHandler()}> Delete Item</button>
            <button onClick={()=>onClose()}> Cancel Delete</button>
        </div>
    </div>
    )
}