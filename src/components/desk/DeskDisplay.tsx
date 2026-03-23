import { useContext, useEffect, useState, type JSX } from "react";
import { SectionContext } from "../../context/SectionContext";
import { DeskContext } from "../../context/DeskContext";
import { PlaceFile } from "../item/PlaceFile";
import { PlaceFolder } from "../item/PlaceFolder";
import { PlaceNote } from "../item/PlaceNote";
import { getItemById, updateItem } from "../../api/item";
import { TutorialContext } from "../../context/TutorialContext";
import type { Item } from "../../../shared/types";
import { useModal } from "../../context/ModalContext";

//////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////// DESK DISPLAY JSX /////////////////////////
///////THIS IS WHERE DESKS GET RECREATED //// ANIMATIONS HANDLER TOO ///////
//////////////////////////////////////////////////////////////////////////////////////////
export function DeskDisplay():JSX.Element{
    const sectionContext = useContext(SectionContext);
    const deskContext = useContext(DeskContext);
    const [coord , setCoord] = useState<{x:number,y:number}>({x:0,y:0});
    const depth  = sectionContext?.depth as number;
    const updateDepth = sectionContext?.updateDepth;
    const [animationClass, setAnimationClass] = useState<"hidden"|"section-enter">("hidden");
    // Used for tutorial part here
    const tutorialContext = useContext(TutorialContext);
    const isDeskHighlighted = tutorialContext?.currentTarget === 'deskDisplay';
    ///// Current and target used for dropping onto folders or backbutton
    const [currentFile , setCurrentFile] = useState<Item|null>(null);
    const [targetFile , setTargetFile] = useState<Item|null>(null);
    const [onBackBtn ,setOnBackBtn] = useState<boolean>(false);
    const{openModal} = useModal();
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

 ///////////////////////DROPPING ONTO FOLDER /////////////////////////////////   
 function currentFileHandler(item : Item|null) : void {
    setCurrentFile(item);
 } function targetFileHandler(item : Item|null) : void {
    setTargetFile(item);
 }
 async function dropBackBtnHandler(item : Item){
    if (onBackBtn){
        if (item.parentId){
            const oldItem = await getItemById(item.parentId);
            if (oldItem){const newItem = {...item , parentId : oldItem?.parentId};
            await updateItem(newItem);
            deskContext?.setOneItem(newItem);
           }
        }
    }
}
///////////////////////////DRAGGABLE ITEM PART ////////////////////////////////
const [offCoord,setOffCoord] = useState<{X : number,Y:number}>({X : 0 , Y : 0});
const [itemId, setItemId] = useState<string>('');
const [isDragging , setIsDragging] = useState<boolean>(false);
const [areaClass , setAreaClass] = useState<string>('');

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
////////////////DRAG FOR DOWNLOAD HERE ///////////////////////////
const [error,setError] = useState<string>('');
const [fileContent , setFileContent] = useState<File|null>(null);
////////////////////USER DISPLAY HERE /////////////////////////////
const existingDesk = deskContext?.currentDesk ;
const {allUsersNameNColor, ...restOfDesk} = existingDesk ?? {};

//////////////////  JSX ELEMENT  //////////   EMPTY ARRAY TRICK FOR DEPTH UPDATES   //////////////////////////
/////////////////// getBoundingClientRect() for mouse positionning not depending on parent //////////////////
    return(
      <div className="centerDisplayed" style={tutorialContext?.isActive ? { pointerEvents: "none" } : {}}>
        <div className="globalHome">
            {Array.from({ length: sectionContext?.depth ?? 0 }).map((_, index) => (
                <div key={index} className="ranged"/>
            ))}
            <div className={`desk-column-large ${animationClass} ${areaClass} ${isDeskHighlighted ? 'tutorialHighlight' : ''}`}                
                // Drag for upload part
                onDragOver={(e)=>{
                    e.preventDefault();
                    setAreaClass('highlighted')
                }}
                onDragLeave={()=>{
                    setAreaClass('');
                }}
                onDrop={(e)=>{
                    e.preventDefault();
                    setAreaClass('');
                    e.dataTransfer.files[0]!=null && setFileContent(e.dataTransfer.files[0])
                    const rect = e.currentTarget.getBoundingClientRect();
                    setCoord({x : e.clientX -rect.left ,y:e.clientY - rect.top });
                    openModal('createItemPrompt',{coord});
                }}
                //////////////////////////////
                onContextMenu={(e)=>{
                    e.preventDefault()
                    if(isDeskHighlighted){
                        tutorialContext?.nextStep() 
                    }
                const rect = e.currentTarget.getBoundingClientRect();
                setCoord({x : e.clientX -rect.left ,y:e.clientY - rect.top });
                openModal('createFilePrompt',{coord,fileContent});
                e.preventDefault()
                }}
                // Drag file handler here
                onMouseMove={(e)=>{
                    const rect = e.currentTarget.getBoundingClientRect();
                    isDragging &&
                    dragHandler(e.clientX-rect.left,e.clientY-rect.top)
                }}
                onMouseUp={async ()=>{
                    setIsDragging(false);
                    setOnBackBtn(false);
                    
                    if((targetFile?.id !== itemId && targetFile) && currentFile){
                        const newFile = {...currentFile, parentId : targetFile.id};
                        await updateItem(newFile);
                        deskContext?.refreshItems();
                    }        
                    else if (!onBackBtn){await udpdateHandler(itemId);}
                    else{currentFile && dropBackBtnHandler(currentFile)}
                    setTargetFile(null);
                    setCurrentFile(null)
                }}
                >
                    {/* User On Desk Display */}
                    <div className="userDisplayOnDesk">
                    {allUsersNameNColor &&
                allUsersNameNColor.map((element) => (
                    <div key={element.userId}>
                        <div className="colorContainer" style={{backgroundColor : element.userColor}}></div>
                        <span className="userNameDisplay">{element.userName}</span>
                    </div>
                ))}
                    </div>

                    {error &&
                    <span  className="errorDropZOne">{error}</span>
                   }
                    {sectionContext?.currentSection &&
                    <button 
                    className="back-btn"
                    style={tutorialContext?.isActive ? { pointerEvents: "none" } : {zIndex : 1000 }  }
                    onClick={
                        ()=>goBack()
                    }
                    onMouseEnter={()=>setOnBackBtn(true)}
                    onMouseLeave={()=>setOnBackBtn(false)}
                    >←</button>}
            {arrayOfItem.map((item)=>(
                item.type === 'folder'
                ? (<PlaceFolder key = {item.id} item = {item} 
                    propsHandler = {(itemId:string , offCoord:{X:number, Y: number})=>propsHandler(itemId, offCoord)}
                    currentFileHandler = {currentFileHandler}
                    targetFileHandler = {targetFileHandler}
                 />)
                : (item.type === 'file' ? 
                    <PlaceFile key = {item.id} item = {item}
                    propsHandler = {(itemId:string , offCoord:{X:number, Y: number})=>propsHandler(itemId, offCoord)}
                    currentFileHandler = {currentFileHandler}/> :
                     <PlaceNote key = {item.id} item = {item} 
                propsHandler = {(itemId:string , offCoord:{X:number, Y: number})=>propsHandler(itemId, offCoord)}
                currentFileHandler = {currentFileHandler}  /> )
            )
            )}
            </div>
        </div>
      </div>
    )
}