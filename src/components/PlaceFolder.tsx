import { useContext, useState, type JSX } from "react";
import type { Item } from "../../shared/types";
import { SectionContext } from "../context/SectionContext";
import { OptionMenu } from "./OptionMenu";

export function PlaceFolder ({item} : {item : Item}) : JSX.Element{
    const sectionContext = useContext(SectionContext);
    const switchSection = sectionContext?.switchSection;
    const depth  = sectionContext?.depth as number;
    const updateDepth = sectionContext?.updateDepth;
    const [optionMenu , setOptionMenu] = useState<boolean>(false);
    const [coord , setCoord] = useState<{x : number,y : number}>({x:0,y:0})
    return (
    <div>
        <div className="icon" onDoubleClick={()=>{switchSection?.(item.id);updateDepth?.(depth+1)}} onContextMenu={(e)=>{
            e.preventDefault();
            e.stopPropagation();
            const rect = e.currentTarget.getBoundingClientRect();
            setCoord({x : e.clientX-rect.left ,y:e.clientY-rect.top})
            setOptionMenu(true)}} id={item.id} 
            style={{left : item.x, top :item.y,
            background : `${item.creatorColor}`
         }} >
            <img  src="/icons/folder.jpg" alt="folder"></img>
            <span className = "icon-label">{item.name}</span>
        </div>
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