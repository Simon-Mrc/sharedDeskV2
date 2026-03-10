import { useState, type JSX } from "react";
import type { Item } from "../../shared/types";

export function PlaceFile ({item} : {item : Item}) : JSX.Element{
    const [optionMenu , setOptionMenu] = useState<boolean>(false);
    return (
        <div>
        <div className="icon" onContextMenu={()=>setOptionMenu(true)} id={item.id} 
        style={{left : item.x, top :item.y,
            background : `${item.creatorColor}`
        }} >
            <img src="/icons/file.png" alt="file"></img>
            <span className = "icon-label">{item.name}</span>
        </div>
        {optionMenu &&
        <OptionMenu />}
        </div>
    )

}