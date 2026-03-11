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
    const [coord , setCoord] = useState<{x:number,y:number}>({x:0,y:0});
    const depth  = sectionContext?.depth as number;
    const updateDepth = sectionContext?.updateDepth;
    const [animationClass, setAnimationClass] = useState<"hidden"|"section-enter">("hidden");

    useEffect(()=>{
        setAnimationClass("hidden");
        const timer = setTimeout(()=>{
            setAnimationClass('section-enter')
        },100);
        return () => clearTimeout(timer); 

    },[sectionContext?.count])

    const arrayOfItem = deskContext?.items?.filter(
    item=>item.parentId===sectionContext?.currentSection
    ) ?? [];
    function goBack(){
        if (sectionContext?.currentSection){
            const currentItemRef = deskContext?.items?.find(item => item.id === sectionContext.currentSection)
            if(currentItemRef && updateDepth){
                sectionContext.switchSection(currentItemRef.parentId)
                updateDepth(depth-1);
            }
        }
    }

    return(
        <div className="centerDisplayed">

        <div className="globalHome">
            {Array.from({ length: sectionContext?.depth ?? 0 }).map((_, index) => (
                <div key={index} className="ranged"/>
            ))}
            <div className={`desk-column-large ${animationClass}`} onContextMenu={(e)=>{
                setShowItemPrompt(true);
                const rect = e.currentTarget.getBoundingClientRect();
                setCoord({x : e.clientX -rect.left ,y:e.clientY - rect.top });
                e.preventDefault()
                }}>
                    {sectionContext?.currentSection &&
                    <button className="back-btn" onClick={()=>goBack()}>←</button>}
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