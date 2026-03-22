import { useContext, useState, type JSX } from "react";
import { DeskContext } from "../../context/DeskContext";
import { UserContext } from "../../context/UserContext";
import type { Item } from "../../../shared/types";
import { SectionContext } from "../../context/SectionContext";
import { updateViewed } from "../../api/item";
import { TutorialContext } from "../../context/TutorialContext"; 
import { TUTORIAL_STEPS } from "../../context/TutorialContext"; 
import { useModal } from "../../context/ModalContext";
import { MenuContainer } from "../../modals/Modal";
import { ErrorDisplay } from "../ui/ErrorDisplay";


//////////////////// CREATE ITEM PROMPT ////////////////////////NOTHING TO COMMENT ON /////////////////////////
export function CreateItemPrompt() : JSX.Element{
    const {data, closeModal} = useModal()
    const deskContext = useContext(DeskContext);
    const userContext = useContext(UserContext);
    const sectionContext= useContext(SectionContext);
    const [type , setType] = useState<Item['type']>("file");
    const [name , setName] = useState<string>('');
    const [error,setError] = useState<string>('');
    const tutorialContext = useContext(TutorialContext)

    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    /////////////////////////////////////////TUTORIAL TARGETS /////////////////////////////////////////////////////
    const currentTrigger = TUTORIAL_STEPS[tutorialContext?.step ?? 0]?.trigger
    const isFileHighlighted   = (tutorialContext?.currentTarget === 'fileButton') && tutorialContext.isActive;
    const isNoteHighlighted   = (tutorialContext?.currentTarget === 'noteButton') && tutorialContext.isActive;
    const isFolderHighlighted = tutorialContext?.currentTarget === 'folderButton' && tutorialContext.isActive;
    const isNameHighlighted   = (tutorialContext?.currentTarget === 'folderNameInput' && tutorialContext.isActive)
                             || (tutorialContext?.currentTarget === 'noteNameInput' && tutorialContext.isActive)
                             || (tutorialContext?.currentTarget === 'fileNameInput' && tutorialContext.isActive)
    const isConfirmHighlighted = (tutorialContext?.currentTarget === 'confirmFolder' && tutorialContext.isActive)
                              || (tutorialContext?.currentTarget === 'confirmNote' && tutorialContext.isActive) 
                              || (tutorialContext?.currentTarget === 'confirmFile' && tutorialContext.isActive);
   ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
   ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    async function itemHandler(){
        console.log(data)
        /////////////////////////////NEED TO ADD A CHECK RIGHT HERE /////////////////////////
        ///////////////////////////////LATER CONCERN /////////////////////////////
        if(deskContext?.currentDesk?.id && userContext?.user?.id){   
            const newItem = await deskContext.createItemDesk({
                deskId : deskContext?.currentDesk?.id,
                name : name,
                type : type,
                x: data.coord.x,
                y : data.coord.y,
                accessPassword : null,
                createdBy : userContext?.user?.id,
                creatorColor : userContext?.user?.userColor,
                parentId : sectionContext?.currentSection ?? null,
                creatorName : userContext.user.userName  
            });
            newItem && await updateViewed(newItem.id);
            deskContext.refreshItems();
            if(isConfirmHighlighted) tutorialContext?.nextStep();
            closeModal();       
        }
        else{
            setError('You need to have permission to create an item !')
        }
    }
   
    ////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////
    return(
    <>
        <MenuContainer onClose={()=>closeModal()}>
            <h2 className="popup-title">New note , file , or folder ?</h2>
            <p className="popup-subtitle">Choose wisely</p>
            <button 
                className={isFileHighlighted ? 'tutorialHighlight' : ''}
                onClick={()=>{
                    setType('file')
                    if(isFileHighlighted && typeof currentTrigger === 'object') {
                        // auto steps 9/10/11 advance on their own, no nextStep needed here!
                    }
                    if(tutorialContext?.currentTarget === 'fileButton' 
                        && typeof currentTrigger !== 'object') tutorialContext?.nextStep()
                }}>
                a file 📑!
            </button>
            <button 
                className={isFolderHighlighted ? 'tutorialHighlight' : ''}
                onClick={()=>{
                    setType('folder')
                    if(isFolderHighlighted 
                        && typeof currentTrigger !== 'object') tutorialContext?.nextStep() // ← step 11 → 12
                }}>
                a folder 📁 !
            </button>
            <button 
                className={isNoteHighlighted ? 'tutorialHighlight' : ''}
                onClick={()=>{
                    setType('note')
                    if(isNoteHighlighted 
                        && typeof currentTrigger !== 'object') tutorialContext?.nextStep() // ← step 20 → 21
                }}>
                a note 📝!
            </button>
            <input 
                className={`ModernInput ${isNameHighlighted ? 'tutorialHighlight' : ''}`}
                onChange={(input)=>{
                    setName(input.target.value)
                    if(isNameHighlighted && (tutorialContext.step === 11)) {setType('folder'); tutorialContext?.nextStep()}
                    if(isNameHighlighted && (tutorialContext.step === 20)) {setType('note'); tutorialContext?.nextStep()}
                    if(isNameHighlighted && (tutorialContext.step != 11 && tutorialContext.step != 20)) {setType('file'); tutorialContext?.nextStep()} // ← step 12/21/30 → next on first keystroke
                }}
                placeholder={`Enter your ${type} name`} 
            />
            <ErrorDisplay error = {error}/>
            <button 
                className={isConfirmHighlighted ? 'tutorialHighlight' : ''}
                onClick={()=>itemHandler()}>
                {`Create your ${type} `}
            </button>
            </MenuContainer>
    </>
    )

}