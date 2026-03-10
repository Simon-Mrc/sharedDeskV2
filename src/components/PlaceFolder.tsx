import { useContext, type JSX } from "react";
import type { Item } from "../../shared/types";
import { SectionContext } from "../context/SectionContext";

export function PlaceFolder ({item} : {item : Item}) : JSX.Element{
    const sectionContext = useContext(SectionContext);
    const switchSection = sectionContext?.switchSection;
    const depth  = sectionContext?.depth as number;
    const updateDepth = sectionContext?.updateDepth;
    return (
        <div className="icon" onDoubleClick={()=>{switchSection?.(item.id);updateDepth?.(depth+1)}}/*onContextMenu={()=>openMenu()}*/ id={item.id} 
        style={{left : item.x, top :item.y,
            background : item.creatorColor
        }} >
            <img  src="/icons/folder.jpg" alt="folder"></img>
            <span className = "icon-label">{item.name}</span>
        </div>
    )

}