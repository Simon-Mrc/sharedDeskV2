import { useContext, useState, type JSX } from "react";
import type { Item } from "../../../shared/types";
import { SectionContext } from "../../context/SectionContext";
import { OptionMenu } from "./OptionMenu";
import { AccessPrompt } from "./../prompts/AccessPrompt";
import { DeskContext } from "../../context/DeskContext";

////////////////// PURE JSX FUNCTION ////////////////// ONLY DOM CREATION HERE //////////////////
////////////////// AGAIN getBoundingClientRect FOR RIGHT MOUSE POSITIONNING //////////////////
/////// WAY MORE COMPLICATED THAN FILE PART DUE TO POSSIBILITY TO NAVIGATE THROUGH SECTION /////////
/////// VIA FOLDER ///// ALSO ADDED SECURITY RIGHT AWAY TO PREVENT NAVIGATION IF PASSWORD ///////////
export function PlaceFolder ({item} : {item : Item}) : JSX.Element{
    const sectionContext = useContext(SectionContext);
    const switchSection = sectionContext?.switchSection;
    const depth  = sectionContext?.depth as number;
    const updateDepth = sectionContext?.updateDepth;
    const [optionMenu , setOptionMenu] = useState<boolean>(false);
    const [coord , setCoord] = useState<{x : number,y : number}>({x:0,y:0});
    const [accessPrompt , setAccessPrompt] = useState<boolean>(false);
    const [hasAccess , setHasAccess] = useState<boolean>(false);
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
                    switchSection?.(item.id);updateDepth?.(depth+1)
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

            <img  src="/icons/folder.jpg" alt="folder"></img>
            <span className = "icon-label">{item.accessPassword&& '🔒'}{item.name}{deskContext?.isNew(item.id)&& '❗'}</span>
        </div>
        {accessPrompt&&
            <AccessPrompt 
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