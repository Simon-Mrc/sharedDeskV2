import { useContext, useState, type JSX } from "react";
import { DeskContext } from "../../context/DeskContext";
import { UserContext } from "../../context/UserContext";
import type { Item } from "../../../shared/types";
import { SectionContext } from "../../context/SectionContext";
import { updateViewed } from "../../api/item";

//////////////////// CREATE ITEM PROMPT ////////////////////////NOTHING TO COMMENT ON /////////////////////////
export function CreateItemPrompt({onClose ,coord} : {onClose : ()=>void , coord : {x:number,y:number}}) : JSX.Element{
    
    const deskContext = useContext(DeskContext);
    const userContext = useContext(UserContext);
    const sectionContext= useContext(SectionContext);
    const [type , setType] = useState<Item['type']>("file");
    const [name , setName] = useState<string>('');
    const [error,setError] = useState<string>('');
    async function itemHandler(){
        /////////////////////////////NEED TO ADD A CHECK RIGHT HERE /////////////////////////
        ///////////////////////////////LATER CONCERN /////////////////////////////
        if(deskContext?.currentDesk?.id && userContext?.user?.id){   
            const newItem = await deskContext.createItemDesk({
                deskId : deskContext?.currentDesk?.id,
                name : name,
                type : type,
                x: coord.x,
                y : coord.y,
                accessPassword : null,
                createdBy : userContext?.user?.id,
                creatorColor : userContext?.user?.userColor,
                parentId : sectionContext?.currentSection ?? null  
            });
            newItem && updateViewed(newItem.id);
            endwithease();       
        }
        else{
            setError('You need to have permission to create an item !')
        }
    }
   
   
    ///////////////////////////////////////////////////////////////////////
    /////////////////////// ANIMATION HANDLER PART TO BE REUSED ////////////////
        ////////////////////////////////////////////////////////////////////
        const [animation , setAnimation] = useState<string>('');
            function endwithease(){
                setTimeout(()=>{
                    setAnimation('fadeOut')
                    setTimeout((()=>{
                        onClose()}),500)
            },1)
        }
    ////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////
    return(
    <div className={`overlay ${animation}`} onClick={()=>endwithease()}>
        <div className="PopupWithBlurr" onClick={(e)=>e.stopPropagation()}>
            <button className="popup-close" onClick={endwithease}>✕</button>
            <h2 className="popup-title">New note , file , or folder ?</h2>
            <p className="popup-subtitle">Choose wisely</p>
            <button onClick={()=> setType('file')}>a file 📑!</button>
            <button onClick={()=> setType('folder')}>a folder 📁 !</button>
            <button onClick={()=> setType('note')}>a note 📝!</button>
            <input className="ModernInput"
            onChange={(input)=>setName(input.target.value)}
            placeholder={`Enter your ${type} name`} />
            {error && 
                 <div className="PopupInside" style={{gridColumn: "1 / -1", textAlign :"center" }}>
                 <span  className="error">{error}</span>
                 </div>
            }
            <button onClick={()=>itemHandler()}> {`Create your ${type} `}</button>
        </div>
    </div>

    )

}