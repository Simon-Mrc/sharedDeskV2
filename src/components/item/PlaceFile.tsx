import { useState, type JSX } from "react";
import type { Item } from "../../../shared/types";
import { OptionMenu } from "./OptionMenu";

////////////////// PURE JSX FUNCTION ////////////////// ONLY DOM CREATION HERE //////////////////
////////////////// AGAIN getBoundingClientRect FOR RIGHT MOUSE POSITIONNING //////////////////
export function PlaceFile ({item} : {item : Item}) : JSX.Element{
    const [optionMenu , setOptionMenu] = useState<boolean>(false);
    const [coord , setCoord] = useState<{x : number,y : number}>({x:0,y:0})
    return (
        <div>
        <div className="icon" onContextMenu={(e)=>{
            e.preventDefault();
            e.stopPropagation();
            const rect = e.currentTarget.getBoundingClientRect();
            setCoord({x : e.clientX-rect.left ,y:e.clientY-rect.top})
            setOptionMenu(true)}} id={item.id} 
        style={{left : item.x, top :item.y,
            background : `${item.creatorColor}`
        }} >
            <img src="/icons/file.png" alt="file"></img>
            <span className = "icon-label">{item.accessPassword&& '🔒'}{item.name}</span>
        </div>
        {optionMenu &&
        <OptionMenu 
        onClose = {()=> setOptionMenu(false)}
        coord = {coord}
        item = {item}
        />}
        </div>
    )
}
////////// NEED TO ADD CHECKS FOR SECURITY SAME AS FOLDER BUT FOR NOW USELESS /////////////