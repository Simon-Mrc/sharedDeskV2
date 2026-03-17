import { useContext, useState, type JSX } from "react";
import type { Item } from "../../../shared/types";
import { SectionContext } from "../../context/SectionContext";
import { OptionMenu } from "./OptionMenu";
import { AccessPromptFolder } from "./../prompts/AccessPrompt";
import { DeskContext } from "../../context/DeskContext";
import { TutorialContext } from "../../context/TutorialContext"; 
import { TUTORIAL_STEPS } from "../../context/TutorialContext";
import { updateItem } from "../../api/item";

////////////////// PURE JSX FUNCTION ////////////////// ONLY DOM CREATION HERE //////////////////
////////////////// AGAIN getBoundingClientRect FOR RIGHT MOUSE POSITIONNING //////////////////
/////// WAY MORE COMPLICATED THAN FILE PART DUE TO POSSIBILITY TO NAVIGATE THROUGH SECTION /////////
/////// VIA FOLDER ///// ALSO ADDED SECURITY RIGHT AWAY TO PREVENT NAVIGATION IF PASSWORD ///////////
export function PlaceFolder ({item , propsHandler,currentFileHandler, targetFileHandler } : 
    {item : Item , propsHandler : (itemId:string , offCoord:{X:number, Y: number})=>void ,
     currentFileHandler : (item : Item|null)=> void,
     targetFileHandler : (item : Item|null)=> void}) : JSX.Element{
    const sectionContext = useContext(SectionContext);
    const switchSection = sectionContext?.switchSection;
    const depth  = sectionContext?.depth as number;
    const updateDepth = sectionContext?.updateDepth;
    const [optionMenu , setOptionMenu] = useState<boolean>(false);
    const [coord , setCoord] = useState<{x : number,y : number}>({x:0,y:0});
    const [accessPrompt , setAccessPrompt] = useState<boolean>(false);
    const [hasAccess , setHasAccess] = useState<boolean>(false);
    const [check , setCheck] = useState<number>(0);
    const deskContext = useContext(DeskContext);
    const tutorialContext = useContext(TutorialContext);
    const [areaClass , setAreaClass] = useState<string>('');
    const [zindex,setZindex] = useState<number>(1)

    /////////////////////////////////TUTORIAL TARGETS//////////////////////////////
    const isHighlighted   = tutorialContext?.currentTarget === 'folder'
    const currentTrigger  = TUTORIAL_STEPS[tutorialContext?.step ?? 0]?.trigger
    const isContextStep   = currentTrigger === 'contextmenu'   // step 15
    const isDblClickStep  = currentTrigger === 'dblclick'      // step 17
    //////////////////////////////////////////////////////////////////////////////

    return (
    <div>
        <div 
            className={`icon fadeIn ${areaClass} ${isHighlighted ? 'tutorialHighlight' : ''}`} 
            draggable = {false}
            id={item.id} 
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
                    switchSection?.(item.id);updateDepth?.(depth+1)
                }
                if(isHighlighted && isDblClickStep) tutorialContext?.nextStep()
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
                if(isHighlighted && isContextStep) tutorialContext?.nextStep()
        }}

        onMouseDown={(e)=>{
            e.preventDefault();
            const rect = e.currentTarget.getBoundingClientRect();
            propsHandler(item.id ,{X : e.clientX-rect.left,Y:e.clientY-rect.top })
            currentFileHandler(item);
            setZindex(0)
        }}
        onMouseUp={()=>{
            setZindex(1);
        }}
        
        onMouseEnter={()=>targetFileHandler(item)}
        onMouseLeave={()=> targetFileHandler(null)}
        >

            <img  src="/icons/folder.jpg" alt="folder"></img>
            {item.creatorName && <span className="userStamp" 
            style={{ color: item.creatorColor, borderColor: item.creatorColor }}
            >{item.creatorName}</span>}
            <span className = "icon-label">{item.accessPassword&& '🔒'}{item.name}{deskContext?.isNew(item.id)&& '✨'}</span>
        </div>
        {accessPrompt&&
            <AccessPromptFolder 
            onClose = {()=> setAccessPrompt(false)}
            setHasAccess = {()=>setHasAccess}
            switchSection = {()=> switchSection?.(item.id ?? null)}
            updateDepth = {()=> updateDepth?.(depth+1)}
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
        </div>
    )
}