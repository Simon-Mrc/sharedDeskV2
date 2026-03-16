import { useContext, useRef, useState, type JSX } from "react";
import type { Item } from "../../../shared/types";
import { OptionMenu } from "./OptionMenu";
import { AccessPromptFile } from "./../prompts/AccessPrompt";
import { DeskContext } from "../../context/DeskContext";
import { downloadFile, updateFile } from "../../api/file";
import { TutorialContext } from "../../context/TutorialContext";

////////////////// PURE JSX FUNCTION ////////////////// ONLY DOM CREATION HERE //////////////////
////////////////// AGAIN getBoundingClientRect FOR RIGHT MOUSE POSITIONNING //////////////////
/////// WAY MORE COMPLICATED THAN FILE PART DUE TO POSSIBILITY TO NAVIGATE THROUGH SECTION /////////
/////// VIA FOLDER ///// ALSO ADDED SECURITY RIGHT AWAY TO PREVENT NAVIGATION IF PASSWORD ///////////
export function PlaceFile ({item , propsHandler} : {item : Item , propsHandler : (itemId:string , offCoord:{X:number, Y: number})=>void }) : JSX.Element{
    const [optionMenu , setOptionMenu] = useState<boolean>(false);
    const [coord , setCoord] = useState<{x : number,y : number}>({x:0,y:0});
    const [accessPrompt , setAccessPrompt] = useState<boolean>(false);
    const [hasAccess , setHasAccess] = useState<boolean>(false);
    const [check , setCheck] = useState<number>(0);
    const [dropArea , setDropArea] = useState<boolean>(false);
    const deskContext = useContext(DeskContext);
    const tutorialContext = useContext(TutorialContext);
    let ext = '';
    if (typeof item.filePath === 'string'){
        ext = item.filePath.split('.').pop()?.toLowerCase()  ?? ''    
    } 

    ///////////////////////////////// TUTORIAL TARGETS ////////////////////////////////////////
    const isFileHighlighted  = tutorialContext?.currentTarget === 'file'
    const isDropHighlighted  = tutorialContext?.currentTarget === 'dropArea'
    ////////////////////////////////////////////////////////////////////////////////////////

    return (
    <div>
        <div 
            className={`icon fadeIn ${isFileHighlighted ? 'tutorialHighlight' : ''}`} 
            draggable = {false}
            id={item.id} 
            style={{left : item.x, top :item.y,
            background : `${item.creatorColor}`
            }}
        onDoubleClick={()=>
            {
                setCheck(1);
                if(item.accessPassword && !hasAccess){
                    setHasAccess(false);
                    setAccessPrompt(true);
                }
                else{
                    item.filePath ? downloadFile(item.id) : setDropArea(true)
                }
                if(isFileHighlighted){
                    tutorialContext?.nextStep()
                    setTimeout(()=>{
                        setDropArea(false)
                    },2500)
                } 
            }}
       
        onClick={()=>deskContext?.markAsViewed(item.id)}
        ///////////////////////////////////////////////////////
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
            propsHandler(item.id ,{X : e.clientX-rect.left,Y:e.clientY-rect.top })
        }}>
            <img  src={`/icons/${ext}.png` || `/icons/${ext}.jpg`} alt="folder"></img>
            <span className = "icon-label">{item.accessPassword&& '🔒'}{item.name}{deskContext?.isNew(item.id)&& '✨'}</span>
        </div>
        {accessPrompt&&
            <AccessPromptFile 
            onClose = {()=> setAccessPrompt(false)}
            setDropArea = {()=>setDropArea(true)}
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
        {dropArea &&
            <DropArea 
            onClose = {()=>{setDropArea(false)}}
            item = {item}
            isDropHighlighted={isDropHighlighted} />
        }
        </div>
    )
}

///////////////////////////////// DROP AREA JSX FUNCTION ////////////////////////
export function DropArea({onClose,item, isDropHighlighted } : {onClose : ()=>void, item : Item, isDropHighlighted : boolean}) : JSX.Element{
   const [areaClass , setAreaClass] = useState<string>('');
   const deskContext = useContext(DeskContext);

    async function handleUpdate(file : File){
        const itemUpdated = await updateFile(item.id,file);
        itemUpdated ? deskContext?.setOneItem(itemUpdated) : 
        setError('File not eligible to download')
    }
    const inputRef = useRef<HTMLInputElement>(null);
    
    
    ///////////////////////////////////////////////////////////////////////
    /////////////////////// ANIMATION HANDLER PART TO BE REUSED ////////////////
        ////////////////////////////////////////////////////////////////////
        const [animation , setAnimationD] = useState<string>('');
            function endwithease(){
                setTimeout(()=>{
                    setAnimationD('fadeOut')
                    setTimeout((()=>{
                        onClose()}),500)
            },1)
        }
        const [error,setError] = useState<string|null>(null);
    ////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////
    return(
        <div className={`overlay ${animation}`} onClick={endwithease}>
            <div 
            className={`dropArea ${areaClass} ${isDropHighlighted ? 'tutorialHighlight' : ''}`}
            onClick={(e)=>{e.stopPropagation()}}
            onDragOver={(e)=>{
                e.preventDefault();
                setAreaClass('highlighted')
            }}
            onDragLeave={()=>{
                setAreaClass('');
            }}
            onDrop={async (e)=>{
                e.preventDefault();
                await handleUpdate(e.dataTransfer.files[0]);
                endwithease();
            }}
            >
                <div className="PopupDropZone" >
                <div style={{gridColumn: "1 / -1", textAlign :"center" }}>
                <h2 className="TitleDropZone">Drop Your File</h2>
                </div>
                </div>
                <span className="dropSeparator">or</span>
                <div>
                <button onClick={()=> inputRef.current?.click()}>
                    Select from computer 💻
                </button>
                <input 
                type="file"
                ref={inputRef}
                style={{display:'none'}}
                onChange={async (e)=> 
                    {e.target.files?.[0] && await handleUpdate(e.target.files[0]);
                    endwithease()
                    }} />
                <button className="popup-close" onClick={endwithease}>✕</button>
                </div>
                {error && 
                 <span  className="errorDropZOne">{error}</span>
                }
            </div>
        </div>
    )
}