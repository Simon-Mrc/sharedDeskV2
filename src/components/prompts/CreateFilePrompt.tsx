import { useContext, useState, type JSX } from "react";
import { DeskContext } from "../../context/DeskContext";
import { UserContext } from "../../context/UserContext";
import type { Item } from "../../../shared/types";
import { SectionContext } from "../../context/SectionContext";
import { updateViewed } from "../../api/item";
import { updateFile } from "../../api/file";


//////////////////// CREATE ITEM PROMPT ////////////////////////NOTHING TO COMMENT ON /////////////////////////
export function CreateFilePrompt({onClose ,coord, fileContent} : {onClose : ()=>void , coord : {x:number,y:number}, fileContent : File | null}) : JSX.Element{
    
    const deskContext = useContext(DeskContext);
    const userContext = useContext(UserContext);
    const sectionContext= useContext(SectionContext);
    const [name , setName] = useState<string>('');
    const [error,setError] = useState<string>('');

    async function handleUpdate(file : File,item : Item){
        const itemUpdated = await updateFile(item.id,file);
        itemUpdated ? deskContext?.setOneItem(itemUpdated) : 
        setError('File not eligible to download')
    }

    async function itemHandler(){
        /////////////////////////////NEED TO ADD A CHECK RIGHT HERE /////////////////////////
        ///////////////////////////////LATER CONCERN /////////////////////////////
        if(deskContext?.currentDesk?.id && userContext?.user?.id){   
            const newItem = await deskContext.createItemDesk({
                deskId : deskContext?.currentDesk?.id,
                name : name,
                type : 'file',
                x: coord.x,
                y : coord.y,
                accessPassword : null,
                createdBy : userContext?.user?.id,
                creatorColor : userContext?.user?.userColor,
                parentId : sectionContext?.currentSection ?? null  
            })
            if(newItem && fileContent){
            await handleUpdate(fileContent,newItem);
            deskContext.refreshItems();
            endwithease();}
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
                <h2 className="popup-title">Choose a name for your upload ?</h2>
                <p className="popup-subtitle">Don t forget the extension</p>
                <input 
                    className={`ModernInput`}
                    onChange={(input)=>{
                        setName(input.target.value)
                        }}
                    placeholder={`Enter your file name`} 
                />
                {error && 
                     <div className="PopupInside" style={{gridColumn: "1 / -1", textAlign :"center" }}>
                     <span  className="error">{error}</span>
                     </div>
                }
                <button 
                    onClick={async ()=> itemHandler()}>
                    {`Create your item for upload `}
                </button>
            </div>
        </div>
    
        )
    }
