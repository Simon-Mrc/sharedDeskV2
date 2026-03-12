import { useEffect, useState } from "react"
import type { Item } from "../../../shared/types"
import { NamePrompt, PasswordPrompt, DeletePrompt } from "./../prompts/OptionPrompts";

////////////////////////////////////BIG ONE HERE OPTION MENU FOR FILES AND FOLDERS ////////////////////////////////////
////////////////////////////USE EFFECT FOR ARRAY OF TRUTH ACTUALLY NOT NEEDED FOR NOW ////////////////////////////////////
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
    

    
    ///////////////////////////////////////////////////////////////////////
    /////////////////////// ANIMATION HANDLER PART TO BE REUSED ////////////////
        ////////////////////////////////////////////////////////////////////
        const [animation , setAnimation] = useState<string>('');
            function endwithease(){
                setTimeout(()=>{
                    setAnimation('fadeOut')
                    setTimeout((()=>{
                        onClose()}),500)
            },1)
        }
    ////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////// JSX PART //// LAUNCHING ALL STATES FOR OPTIONS FUNCTIONS ////////////////////////////////////
    return(
        <div className={`overlay ${animation}`} onClick={()=>endwithease()}>
            <div className={`PopupWithBlurrOption ${hidden}`} onClick={(e)=>e.stopPropagation()} style={{
                left : coord.x,
                top : coord.y}}>
                <button onClick={()=>setNamePrompt(true)}>Rename!</button>
                {namePrompt &&
                <NamePrompt 
                onClose = {()=> setNamePrompt(false)}
                item = {item}
                />}
                <button onClick={()=> setDeletePrompt(true)} >Delete!</button>
                {deletePrompt &&
                <DeletePrompt 
                onClose = {()=> setDeletePrompt(false)} 
                item = {item}
                />}
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
                <button className="popup-closeOption" onClick={endwithease}>✕</button>
            </div>
        </div>
    )
}