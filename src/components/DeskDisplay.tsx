import { useContext, useEffect, useState, type JSX } from "react";
import { SectionContext } from "../context/SectionContext";
import { DeskContext } from "../context/DeskContext";
import { PlaceFile } from "./PlaceFile";
import { PlaceFolder } from "./PlaceFolder";
import { CreateItemPrompt } from "./CreateItemPrompt";

export function DeskDisplay():JSX.Element{
    const sectionContext = useContext(SectionContext);
    const deskContext = useContext(DeskContext);
    const [showItemPrompt,setShowItemPrompt] = useState<boolean>(false);
    const [coord , setCoord] = useState<{x:number,y:number}>({x:0,y:0})

    const arrayOfItem = deskContext?.items?.filter(
    item=>item.parentId===sectionContext?.currentSection
    ) ?? [];

    return(
        <div className="centerDisplayed">

        <div className="globalHome">
            {Array.from({ length: sectionContext?.depth ?? 0 }).map((_, index) => (
                <div key={index} className="ranged"/>
            ))}
            <div className="desk-column-large section-enter" onContextMenu={(e)=>{
                setShowItemPrompt(true);
                setCoord({x : e.pageX ,y:e.pageY });
                e.preventDefault()
                }}>
                    {showItemPrompt &&
                <CreateItemPrompt 
                onClose = {()=>setShowItemPrompt(false)}
                coord =  {coord}/>
                    }
            {arrayOfItem.map((item)=>(
                item.type === 'folder'
                ? <PlaceFolder key = {item.id} item = {item}/>
                : <PlaceFile key = {item.id} item = {item}/>
            )
            )}

            </div>

        </div>
      </div>
    )
}