import { useContext, useState, type JSX } from "react";
import { DeskContext } from "../../context/DeskContext";
import { UserContext } from "../../context/UserContext";
import type { Item } from "../../../shared/types";
import { SectionContext } from "../../context/SectionContext";
import { updateFile } from "../../api/file";
import { useModal } from "../../context/ModalContext";
import { ErrorDisplay } from "../ui/ErrorDisplay";
import { MenuContainer } from "../../modals/Modal";
import { useEnterKey } from "../../customHooks/useEnterKey";


//////////////////// CREATE ITEM PROMPT ////////////////////////NOTHING TO COMMENT ON /////////////////////////
export function CreateFilePrompt() : JSX.Element{
    
    const{closeModal,data} = useModal()
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
                x: data.newCoord.x,
                y : data.newCoord.y,
                accessPassword : null,
                createdBy : userContext?.user?.id,
                creatorColor : userContext.user.userColor,
                parentId : sectionContext?.currentSection ?? null,
                creatorName : userContext.user.userName
            })
            if(newItem && data.fileContent){
            await handleUpdate(data.fileContent,newItem);
            deskContext.refreshItems();
            closeModal();}
        }
        else{
            setError('You need to have permission to create an item !')
        }
    }
    useEnterKey(itemHandler)
        ////////////////////////////////////////////////////////////////////////////////
        ////////////////////////////////////////////////////////////////////////////////
        return(
            <>
                <MenuContainer onClose={closeModal}>
                <h2 className="popup-title">Choose a name for your upload ?</h2>
                <p className="popup-subtitle">Don t forget the extension</p>
                <input 
                    className={`ModernInput`}
                    onChange={(input)=>{
                        setName(input.target.value)
                        }}
                    placeholder={`Enter your file name`} 
                />
                <ErrorDisplay error = {error} />
                <button 
                    onClick={async ()=> itemHandler()}>
                    {`Create your item for upload `}
                </button>
                </MenuContainer>
            </> 
        )
    }
