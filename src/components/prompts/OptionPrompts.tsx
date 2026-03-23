import { useContext, useState, type JSX } from "react";
import { deleteItem, updateItem } from "../../api/item";
import { DeskContext } from "../../context/DeskContext";
import { UserContext } from "../../context/UserContext";
import { deleteFile } from "../../api/file";
import { useModal } from "../../context/ModalContext";
import { MenuContainer } from "../../modals/Modal";
import { ErrorDisplay } from "../ui/ErrorDisplay";
import { useInputErrorAnimation } from "../../customHooks/useAnimation";
import { useEnterKey } from "../../customHooks/useEnterKey";

//////////////////////////////////////////////////////////////////////////////////////////
////////////////// ALL JSX FUNCTION FOR OPTION PROMPT ON ITEMS HERE ! //////////////////
//////////////////////////////////////////////////////////////////////////////////////////

//////////////////////////////////// NAME PROMPT ////////////////////////////////////
export function ItemNamePrompt() : JSX.Element{
    const {closeModal,data} = useModal();
    const [name , setName] = useState<string>(data.name);
    const deskContext = useContext(DeskContext);
    const arrayOfItem = deskContext?.items;
    
    async function handleUpdate(){
        const updatedItem = {...data, name : name}
        try{
    //////////////////// UPDATE IN DB ///////////////////////////
            updateItem(updatedItem);
    ///////////TAKE ALL ITEM ARRAY AND REPLACE ONLY THE ONE MODIFIED IN DESK CONTEXT ///////////////////
            const newArray = arrayOfItem?.map((i)=>i.id === updatedItem.id ? updatedItem : i )
            deskContext?.setAllItems(newArray ?? null);
        }catch(error){
            console.log('fail to access db')
        }
        closeModal()
    }
    useEnterKey(handleUpdate)
    
    ////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////
    return(
    <>
        <MenuContainer onClose={closeModal}>
            <h2 className="popup-title">About to change item name !</h2>
            <input className="ModernInput"
            onChange={(input)=>setName(input.target.value)}
            placeholder="Enter a new name"/>
            <button onClick={()=>handleUpdate()}> Change Name</button>
        </MenuContainer>
    </>
    )

}

//////////////////////////////////// PASSWORD PROMPT ////////////////////////////////////
export function ItemPasswordPrompt() : JSX.Element{
    const {closeModal,data} = useModal()
    const [password , setPassword] = useState<string|null>(null);
    const deskContext = useContext(DeskContext);
    const arrayOfItem = deskContext?.items;
    
    async function handleUpdate(){
    const updatedItem = {...data, accessPassword : password}
        try{
            ////////////////////UPDATE IN DB /////////////////
            updateItem(updatedItem);
            ///////// TAKE ALL ITEM ARRAY AND REPLACE THE RIGHT ONE FOR DESKCONTEXT //////////////
            const newArray = arrayOfItem?.map((i)=>i.id === updatedItem.id ? updatedItem : i )
            deskContext?.setAllItems(newArray ?? null);
        }catch(error){
            console.log('fail to access db')
        }
        closeModal()
    }
    useEnterKey(handleUpdate)
    
    ////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////
    return(
        <>
            <MenuContainer onClose={closeModal}>
            <h2 className="popup-title">About to change item password !</h2>
            <input className="ModernInput" type="password"
            onChange={(input)=>setPassword(input.target.value)}
            placeholder="Enter a new password"/>
            <button onClick={()=>handleUpdate()}> Change password</button>
            </MenuContainer>
        </>
    )

}

//////////////////////////////////// DELETE PROMPT ////////////////////////////////////
export function ItemDeletePrompt() : JSX.Element{
    const {closeModal,data} = useModal();
    const {error, inputAnimation, triggerAnimation} = useInputErrorAnimation();
    const deskContext = useContext(DeskContext);
    const userContext = useContext(UserContext);
    const [input,setInput] = useState<string>('');
    
    async function deleteHandler(){
        if(input === data.name && userContext?.user?.id === data.createdBy){
            /////// DELETE IN DB //////////
            data.filePath!=null ? await deleteFile(data.id) : await deleteItem(data.id);
            ///// HERE WE DON T UPDATE FROM ARRAY BECAUSE IT WOULD HAVE NEEDED RECURSIVE FUNCTION //////
            //// DELETE IS RECURSIVE FOR FILES AND FOLDER AND HANDLE BY FOREIGN KEY IN DB //////
            //// SO REFRESH ITEMS JUST CALL THE NEW ARRAY OF ITEM TO UPDATE DESKCONTEXT /////////
            deskContext?.refreshItems();
            closeModal()
        }else{
            triggerAnimation('Look better and don t typo ! (you moron)')
        }
    }
    useEnterKey(deleteHandler);

    ////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////
    return(
        <>
            <MenuContainer onClose={closeModal}>
            <h2 className="popup-title">{`enter ${data.name} to confirm the delete`}</h2>
            <input className={`ModernInput ${inputAnimation}`}
            onChange={(input)=>setInput(input.target.value)}
            placeholder={`enter ${data.name} to confirm`}/>
            <ErrorDisplay error={error}/>
            <button onClick={()=>deleteHandler()}> Delete Item</button>
            <button onClick={()=>closeModal()}> Cancel Delete</button>
            </MenuContainer>
        </>
    )
}