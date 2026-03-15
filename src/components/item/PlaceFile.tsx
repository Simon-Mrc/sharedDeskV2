import { useContext, useState, type JSX } from "react";
import type { Item } from "../../../shared/types";
import { OptionMenu } from "./OptionMenu";
import { AccessPromptFile, AccessPromptNote } from "./../prompts/AccessPrompt";
import { DeskContext } from "../../context/DeskContext";

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
    const deskContext = useContext(DeskContext)

    return (
    <div>
        <div className="icon fadeIn" 
            draggable = {false}
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
                    
        ///////////////////////////////////////////////////////
                }
            }}
        onClick={()=>deskContext?.markAsViewed(item.id)}
        ///////////////////////////////////////////////////////
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
        }}
        onMouseDown={(e)=>{
            e.preventDefault();
            const rect = e.currentTarget.getBoundingClientRect();
            propsHandler(item.id ,{X : e.clientX-rect.left,Y:e.clientY-rect.top })
        }}>

            <img  src="/icons/file.png" alt="file"></img>
            <span className = "icon-label">{item.accessPassword&& '🔒'}{item.name}{deskContext?.isNew(item.id)&& '✨'}</span>
        </div>
        {accessPrompt&&
            <AccessPromptFile 
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
        </div>
    )
}