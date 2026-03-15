import { useContext, useEffect, useState, type JSX } from "react";
import { SectionContext } from "../../context/SectionContext";
import { DeskContext } from "../../context/DeskContext";
import { PlaceFile } from "../item/PlaceFile";
import { PlaceFolder } from "../item/PlaceFolder";
import { CreateItemPrompt } from "../prompts/CreateItemPrompt";
import { PlaceNote } from "../item/PlaceNote";
import { updateItem } from "../../api/item";

//////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////// DESK DISPLAY JSX /////////////////////////
///////THIS IS WHERE DESKS GET RECREATED //// ANIMATIONS HANDLER TOO ///////
//////////////////////////////////////////////////////////////////////////////////////////
export function DeskDisplay():JSX.Element{
    const sectionContext = useContext(SectionContext);
    const deskContext = useContext(DeskContext);
    const [showItemPrompt,setShowItemPrompt] = useState<boolean>(false);
    const [coord , setCoord] = useState<{x:number,y:number}>({x:0,y:0});
    const depth  = sectionContext?.depth as number;
    const updateDepth = sectionContext?.updateDepth;
    const [animationClass, setAnimationClass] = useState<"hidden"|"section-enter">("hidden");
////////////////// ANIMATION HANDLER HERE //////////////////
    useEffect(()=>{
        setAnimationClass("hidden");
        const timer = setTimeout(()=>{
            setAnimationClass('section-enter')
        },100);
        return () => clearTimeout(timer); 
    },[sectionContext?.count])

////////////////// NAVIGATION + ITEM BY DESK HANDLER //////////////////
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

///////////////////////////DRAGGABLE ITEM PART ////////////////////////////////
const [offCoord,setOffCoord] = useState<{X : number,Y:number}>({X : 0 , Y : 0});
const [itemId, setItemId] = useState<string>('');
const [isDragging , setIsDragging] = useState<boolean>(false);

async function udpdateHandler(itemToDbId : string) : Promise<void>{
    const itemToDb = deskContext?.findOneItem(itemToDbId);
    if(itemToDb){
        await updateItem(itemToDb)
    }
};

function dragHandler(X : number,Y : number ){
    const item = deskContext?.findOneItem(itemId);
    if (item) {
        const newItem = {...item , x : X-offCoord.X , y: Y-offCoord.Y};
        deskContext?.setOneItem(newItem)
    }
}

function propsHandler(itemId:string , offCoord:{X:number, Y: number}){
    setItemId(itemId);
    setOffCoord(offCoord);
    setIsDragging(true);
}
//////////////////  JSX ELEMENT  //////////   EMPTY ARRAY TRICK FOR DEPTH UPDATES   //////////////////////////
/////////////////// getBoundingClientRect() for mouse positionning not depending on parent //////////////////
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
                }}
                onMouseMove={(e)=>{
                    const rect = e.currentTarget.getBoundingClientRect();
                    isDragging &&
                    dragHandler(e.clientX-rect.left,e.clientY-rect.top)
                }}
                onMouseUp={()=>{
                    setIsDragging(false);
                    udpdateHandler(itemId);
                }}
                >
                    {sectionContext?.currentSection &&
                    <button className="back-btn" onClick={()=>goBack()}>←</button>}
                    {showItemPrompt &&
                <CreateItemPrompt 
                onClose = {()=>setShowItemPrompt(false)}
                coord =  {coord}/>
                    }
            {arrayOfItem.map((item)=>(
                item.type === 'folder'
                ? (<PlaceFolder key = {item.id} item = {item} 
                    propsHandler = {(itemId:string , offCoord:{X:number, Y: number})=>propsHandler(itemId, offCoord)}/>)
                : (item.type === 'file' ? 
                    <PlaceFile key = {item.id} item = {item}
                    propsHandler = {(itemId:string , offCoord:{X:number, Y: number})=>propsHandler(itemId, offCoord)}/> :
                     <PlaceNote key = {item.id} item = {item} 
                propsHandler = {(itemId:string , offCoord:{X:number, Y: number})=>propsHandler(itemId, offCoord)}  /> )
            )
            )}
            </div>
        </div>
      </div>
    )
}