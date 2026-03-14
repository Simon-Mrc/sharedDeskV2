import { useContext, useEffect, useState, type JSX } from "react";
import type { Item } from "../../../shared/types";
import { OptionMenu } from "./OptionMenu";
import { AccessPromptNote } from "./../prompts/AccessPrompt";
import { DeskContext } from "../../context/DeskContext";
import { getNoteById, updateNoteContent } from "../../api/note";

////////////////// PURE JSX FUNCTION ////////////////// ONLY DOM CREATION HERE //////////////////
////////////////// AGAIN getBoundingClientRect FOR RIGHT MOUSE POSITIONNING //////////////////

export function PlaceNote ({item} : {item : Item}) : JSX.Element{
    const [optionMenu , setOptionMenu] = useState<boolean>(false);
    const [coord , setCoord] = useState<{x : number,y : number}>({x:0,y:0});
    const [accessPrompt , setAccessPrompt] = useState<boolean>(false);
    const [hasAccess , setHasAccess] = useState<boolean>(false);
    const [noteContent , setNoteContent] = useState<boolean>(false);
    const [check , setCheck] = useState<number>(0);
    const deskContext = useContext(DeskContext)

    return (
    <div>
        <div className="icon fadeIn" 
            id={item.id} 
            style={{left : item.x, top :item.y,
            background : `${item.creatorColor}`
            }}
        onDoubleClick={()=>
            {
                setCheck(1)
                if(item.accessPassword && !hasAccess){
                    setHasAccess(false);
                    setAccessPrompt(true);
                }
                else{
                    setNoteContent(true)
                }
            }}
        onClick={()=>deskContext?.markAsViewed(item.id)}
        onContextMenu={(e)=>
            {
                e.preventDefault();
                e.stopPropagation();                
                const rect = e.currentTarget.getBoundingClientRect();
                setCoord({x : e.clientX-rect.left ,y:e.clientY-rect.top})
                if(item.accessPassword && !hasAccess){
                    setHasAccess(false);
                    setAccessPrompt(true);
                }
                else{
                    setOptionMenu(true)
                }
        }}>

            <img  src="/icons/note.png" alt="note"></img>
            <span className = "icon-label">{item.accessPassword&& '🔒'}{item.name}{deskContext?.isNew(item.id)&& '✨'}</span>
        </div>
        {accessPrompt&&
            <AccessPromptNote 
            onClose = {()=> setAccessPrompt(false)}
            setHasAccess = {()=>setHasAccess}
            setOptionMenu = {()=> setOptionMenu(true)}
            item = {item}
            check = {check}
        />
        }
        {optionMenu &&
            <OptionMenu 
            onClose = {()=> setOptionMenu(false)}
            coord = {coord}
            item = {item}
            />
        }
        {noteContent &&
            <NoteContent
            onClose = {()=> setNoteContent(false)}
            coord = {coord}
            item = {item}
            />
        }
        </div>
    )
}

////////////////// NOTE CONTENT DOM FUNCTION ////////////////// FETCH AND UPDATE CONTENT FROM/TO DB //////////////////
////////////////// //////////////////
export function NoteContent ({onClose, coord, item} : {onClose : ()=>void , coord : {x:number,y:number} , item : Item}) : JSX.Element{
    const[content , setContent] = useState<string>('');
    const [error,setError] = useState<string|null>(null);
    
    async function contentInit(){
        const note = await getNoteById(item.id);
        note ? setContent(note.content) : setError('Note must have been deleted')
    }
    
//////////////// NEVER FORGET THIS !!! OR LOOP FOREVER ////////////////
    useEffect(()=>{
        contentInit();
    },[])

    ////////////// UPDATE CONTENT AND IN UPDATE TABLE ///////////
    async function contentHandler(){ 
        console.log(content);
        const contentUpdated = await updateNoteContent(item.id,content);
        console.log(contentUpdated)
        !contentUpdated && setError('Failed to save Note ! Plz try again');
    }
    
    //////////////////// AUTO SAVE EVERY 1 SEC USER DON T TYPE /////////////
    useEffect(()=>{
        const timer = setTimeout(()=>{
            contentHandler();
        },1500)
        return()=> clearTimeout(timer)
    },[content])
    
    ///////////////////////////////////////////////////////////////////////
    /////////////////////// ANIMATION HANDLER PART TO BE REUSED ////////////////
        ////////////////////////////////////////////////////////////////////
        const [animation , setAnimationD] = useState<string>('foldin');
            function endwithease(){
                setTimeout(()=>{
                    setAnimationD('foldout')
                    setTimeout((()=>{
                        onClose()}),500)
            },1)
        }
    ////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////
    return(
        <div className={`overlay ${animation}`}>
            <div className="NoteContainer"onClick={(e)=>e.stopPropagation()} style={{
                left : coord.x,
                top : coord.y}}>
                <button className="CloseNoteBtn" onClick={endwithease}>✕</button>
                <h2 className="TitleForNote">{item.name}</h2>
                <textarea className="NoteContent"
                value={content}
                 onChange={(input)=>setContent(input.target.value)}
                 placeholder="Your imagination is the limite lol"/>
                
                {error && 
                 <div className="PopupNote">
                 <span  className="NoteError">{error}</span>
                 </div>
                }
                <button onClick={contentHandler}> SaveNote !</button>
            </div>
        </div>
    )
}