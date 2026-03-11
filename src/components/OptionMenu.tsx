import { useEffect, useState } from "react"
import type { Item } from "../../shared/types"
import { NamePrompt, PasswordPrompt } from "./OptionPrompts";

export function OptionMenu({onClose ,coord, item} : {onClose : ()=>void , coord : {x:number,y:number}, item : Item}){
    const [namePrompt , setNamePrompt] = useState<boolean>(false);
    const [deletePrompt , setDeletePrompt] = useState<boolean>(false);
    const [passwordPrompt , setPasswordPrompt] = useState<boolean>(false);
    const [duplicatePrompt , setDuplicatePrompt] = useState<boolean>(false);
    const [hidden,setHidden] = useState<string>('');
    useEffect(()=>{
    const arrayOfTruth = [namePrompt,deletePrompt,passwordPrompt,duplicatePrompt];
    if (arrayOfTruth.includes(true)){
        setHidden('hidden')
    }else{
        setHidden('')
    }
    },[namePrompt,deletePrompt,duplicatePrompt,passwordPrompt])
    return(
        <div className="overlay" onClick={()=>onClose()}>
            <div className={`PopupWithBlurrOption ${hidden}`} onClick={(e)=>e.stopPropagation()} style={{
                left : coord.x,
                top : coord.y}}>
                <button onClick={()=>setNamePrompt(true)}>Rename!</button>
                {namePrompt &&
                <NamePrompt 
                onClose = {()=> setNamePrompt(false)}
                item = {item}
                />}
                <button >Delete!</button>
                {/* {deletePrompt &&
                <DeletePrompt 
                onClose = {()=> setDeletePrompt(false)} 
                item = {item}
                />} */}
                <button onClick={()=> setPasswordPrompt(true)}>Set Password!</button>
                {passwordPrompt &&
                <PasswordPrompt 
                onClose = {()=> setPasswordPrompt(false)}
                item = {item}
                 />}
                <button >Set RickRoll!</button>
                <button >duplicate!</button>
                {/* {duplicatePrompt &&
                <DuplicatePrompt onClose = {()=> setDuplicatePrompt(false)} />} */}
                <button className="popup-closeOption" onClick={onClose}>✕</button>
            </div>
        </div>
    )
}