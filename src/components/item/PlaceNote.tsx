import { useContext, useEffect, useState, type JSX } from "react";
import type { Item } from "../../../shared/types";
import { OptionMenu } from "./OptionMenu";
import { AccessPromptNote } from "./../prompts/AccessPrompt";
import { DeskContext } from "../../context/DeskContext";
import { getNoteById, updateNoteContent } from "../../api/note";
import { UserContext } from "../../context/UserContext";
import { TutorialContext } from "../../context/TutorialContext";

////////////////// PURE JSX FUNCTION ////////////////// ONLY DOM CREATION HERE //////////////////
////////////////// AGAIN getBoundingClientRect FOR RIGHT MOUSE POSITIONNING //////////////////

export function PlaceNote ({item , propsHandler, currentFileHandler} : {item : Item , propsHandler : (itemId:string , offCoord:{X:number, Y: number})=>void ,currentFileHandler : (item : Item|null)=> void} ) : JSX.Element{
    const [optionMenu , setOptionMenu] = useState<boolean>(false);
    const [coord , setCoord] = useState<{x : number,y : number}>({x:0,y:0});
    const [accessPrompt , setAccessPrompt] = useState<boolean>(false);
    const [hasAccess , setHasAccess] = useState<boolean>(false);
    const [noteContent , setNoteContent] = useState<boolean>(false);
    const [check , setCheck] = useState<number>(0);
    const deskContext = useContext(DeskContext);
    const tutorialContext = useContext(TutorialContext);
    const [zindex,setZindex] = useState<number>(1);

    //////////////////// TUTORIAL TARGETS ///////////////////////////////
    const isNoteHighlighted     = tutorialContext?.currentTarget === 'note'
    const isCloseHighlighted    = tutorialContext?.currentTarget === 'closeNote'
    /////////////////////////////////////////////////////////////////////////////


    return (
    <div style={tutorialContext?.isActive ? { pointerEvents: "none" } : {}}>
        <div 
            className={`icon fadeIn ${isNoteHighlighted ? 'tutorialHighlight' : ''}`}
            id={item.id} 
            draggable = {false}
            style={{left : item.x, top :item.y,
            background : `${item.creatorColor}`,
            zIndex : zindex
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
                if(isNoteHighlighted) tutorialContext?.nextStep()
            }}
        onClick={()=>deskContext?.markAsViewed(item.id)}
        onContextMenu={(e)=>
            {
                setCheck(0);
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
        }}
        onMouseDown={(e)=>{
            e.preventDefault();
            const rect = e.currentTarget.getBoundingClientRect();
            propsHandler(item.id ,{X : e.clientX-rect.left,Y:e.clientY-rect.top });
            setZindex(0);
            currentFileHandler(item);
        }}
        onMouseUp={()=>{
            setZindex(1);
        }}
        >

            <img  src="/icons/note.png" alt="note"></img>
            {item.creatorName && <span className="userStamp" 
            style={{ color: item.creatorColor, borderColor: item.creatorColor }}
            >{item.creatorName}</span>}
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
            isCloseHighlighted={isCloseHighlighted}
            />
        }
        </div>
    )
}

////////////////// NOTE CONTENT DOM FUNCTION ////////////////// FETCH AND UPDATE CONTENT FROM/TO DB //////////////////

////////////////// //////////////////
export function NoteContent ({onClose, coord, item, isCloseHighlighted} : {onClose : ()=>void , coord : {x:number,y:number} , item : Item, isCloseHighlighted : boolean}) : JSX.Element{
    const [error,setError] = useState<string|null>(null);
    const userContext = useContext(UserContext);
    const deskContext = useContext(DeskContext);
    const [oldContent , setOldContent] = useState<{userName : string , userColor : string , userContent : string ,date : string}[] |null>(null);
    const [newcontent , setNewContent] = useState<{userName : string , userColor : string , userContent : string, date : string } |null>(null);
    const tutorialContext = useContext(TutorialContext);
    const isContentHighlighted = tutorialContext?.currentTarget === 'noteContent';


    async function contentInit(){
        const note = await getNoteById(item.id);
        note?.content && setOldContent(JSON.parse(note.content)) 
    }
    
//////////////// NEVER FORGET THIS !!! OR LOOP FOREVER ////////////////
    useEffect(()=>{
        contentInit();
    },[])

    ////////////// UPDATE CONTENT AND IN UPDATE TABLE ///////////
    async function contentHandler(){
        if(newcontent && newcontent.userContent){
            const needUpdate = [...(oldContent ?? []),newcontent]
            const contentUpdated = await updateNoteContent(item.id,JSON.stringify(needUpdate));
            !contentUpdated && setError('Failed to save Note ! Plz try again');
        }
        if(newcontent && newcontent.userContent === ''){
            const contentUpdated = await updateNoteContent(item.id,JSON.stringify(oldContent));
        }
    }
    
    //////////////////// AUTO SAVE EVERY 1 SEC USER DON T TYPE /////////////
    useEffect(()=>{
        const timer = setTimeout(()=>{
            contentHandler();
        },1500)
        return()=> clearTimeout(timer)
    },[newcontent?.userContent])

    ///////////////////////////////////////////////////////////////////////
    /////////////////////// ANIMATION HANDLER PART TO BE REUSED ////////////////
        ////////////////////////////////////////////////////////////////////
        const [animation , setAnimationD] = useState<string>('foldin');
            function endwithease(){
                deskContext?.markAsViewed(item.id, true)
                setTimeout(()=>{
                    setAnimationD('foldout')
                    setTimeout((()=>{
                        onClose()}),500)
            },1)
        }

    const user = userContext?.user; // TS WON T TRUST ME IN CALLBACK <INPUT></INPUT>
    const dateNow = new Date().toLocaleString()
    ////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////
    return(
        <div className={`overlay ${animation}`}>
            <div className={`NoteContainer ${animation}`}onClick={(e)=>e.stopPropagation()} style={{
                left : coord.x,
                top : coord.y,
                position : "relative"}}>
                <button 
                    className={`CloseNoteBtn ${isCloseHighlighted ? 'tutorialHighlight' : ''}`} 
                    onClick={()=>{
                        endwithease()
                        if(isCloseHighlighted) tutorialContext?.nextStep();
                    }}>
                    ✕
                </button>
                <h2 className="TitleForNote">{item.name}</h2>
                {oldContent?.map((object)=>(
                <div className="OldPart" key={object.date} style={{color : object.userColor}}>     
                <div style={{color : object.userColor}} > {`${object.userContent}` } </div>
                <div style={{color : object.userColor}} > {`by : ${object.userName} at : ${object.date}` } </div>
                </div>         
                ))}
                {user &&
                <textarea 
                className={`NoteContent ${isContentHighlighted ? 'tutorialHighlight' : ''}`} 
                value={newcontent?.userContent ?? ''}
                onChange={(input)=>{
                    setNewContent({userName : user.userName, userColor : user.userColor, userContent : input.target.value, date : dateNow})
                    if(isContentHighlighted) tutorialContext?.nextStep() 
                }}
                placeholder="Your imagination is the limite lol"
            />
                }
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