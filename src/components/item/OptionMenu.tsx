import { useContext, useState } from "react"
import type { Item } from "../../../shared/types"
import { TutorialContext } from "../../context/TutorialContext";
import { useCloseAnimation } from "../../customHooks/useAnimation";
import { useModal } from "../../context/ModalContext";

////////////////////////////////////BIG ONE HERE OPTION MENU FOR FILES AND FOLDERS ////////////////////////////////////
////////////////////////////USE EFFECT FOR ARRAY OF TRUTH ACTUALLY NOT NEEDED FOR NOW ////////////////////////////////////
export function OptionMenu({onClose ,coord, item} : {onClose : ()=>void , coord : {x:number,y:number}, item : Item}){
    const {openModal} = useModal();
    const {animation, endWithEase} = useCloseAnimation(onClose);
    const [duplicatePrompt , setDuplicatePrompt] = useState<boolean>(false);
    const [hidden,setHidden] = useState<string>('');
    const tutorialContext = useContext(TutorialContext);
    const isHighlighted = (tutorialContext?.step === 15 && tutorialContext.isActive);

    ////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////// JSX PART //// LAUNCHING ALL STATES FOR OPTIONS FUNCTIONS ////////////////////////////////////
    return(
        <div className={`overlay ${animation}`} onClick={()=>endWithEase()}>
            <div className={`PopupWithBlurrOption ${hidden}`} onClick={(e)=>e.stopPropagation()} style={{
                left : coord.x,
                top : coord.y}}>
                <button onClick={()=>openModal('itemNamePrompt',item)}>Rename!</button>
                <button onClick={()=> openModal('itemDeletePrompt',item)} >Delete!</button>
                <button onClick={()=> openModal('itemPasswordPrompt', item)}>Set Password!</button>
                <button >Set RickRoll!</button>
                <button >duplicate!</button>
                {/* {duplicatePrompt &&
                <DuplicatePrompt onClose = {()=> setDuplicatePrompt(false)} />} */}
                <button  className={`popup-closeOption ${isHighlighted ? 'tutorialHighlight' : ''}`} 
                onClick={()=>{
                    tutorialContext?.isActive ?
                    tutorialContext?.nextStep() : endWithEase()  ; 
                    endWithEase()
                }}
                    >✕</button>
            </div>
        </div>
    )
}