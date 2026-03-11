import { useContext, useState, type JSX } from "react";
import { DeskContext } from "../../context/DeskContext";
import { UserContext } from "../../context/UserContext";
import type { Item } from "../../../shared/types";
import { SectionContext } from "../../context/SectionContext";


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
            })
            onClose();       
        }
        else{
            setError('You need to have permission to create an item !')
        }
    }
    return(
    <div className="overlay" onClick={()=>onClose()}>
        <div className="PopupWithBlurr" onClick={(e)=>e.stopPropagation()}>
            <button className="popup-close" onClick={onClose}>✕</button>
            <h2 className="popup-title">Do you want a new note , file , or folder ?</h2>
            <p className="popup-subtitle">Choose wisely</p>
            <button onClick={()=> setType('file')}>a file 📑!</button>
            <button onClick={()=> setType('folder')}>a folder 📁 !</button>
            <span className="error">You chose a {type}</span>
            <input className="ModernInput"
            onChange={(input)=>setName(input.target.value)}
            placeholder='Enter your new item name' />
            {error && <span className="error">⚒️{error}</span>}
            <button onClick={()=>itemHandler()}> Create your item</button>
        </div>
    </div>

    )

}