import type { JSX } from "react";
import type { Item } from "../../shared/types";

export function PlaceFile ({item} : {item : Item}) : JSX.Element{
    return (
        <div className="icon" /*onContextMenu={()=>openMenu()}*/ id={item.id} 
        style={{left : item.x, top :item.y,
            boxShadow : `0 8px 20px ${item.creatorColor}`
        }} >
            <img src="/icons/file.png" alt="file"></img>
            <span>{item.name}</span>
        </div>
    )

}