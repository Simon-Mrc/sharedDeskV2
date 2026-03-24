import { useContext, useState, type JSX } from "react";
import { createDesk } from "../../api/desk";
import { DeskContext } from "../../context/DeskContext";
import { TutorialContext } from "../../context/TutorialContext";
import { useModal } from "../../context/ModalContext";
import { ErrorDisplay } from "../ui/ErrorDisplay";
import { MenuContainer } from "../../modals/Modal";
import { useInputErrorAnimation } from "../../customHooks/useAnimation";
import { useEnterKey } from "../../customHooks/useEnterKey";

/////////////// CREATING DESK PROMPT ////////////////// SWITCH CURRENT DESK ON CREATION : DESKCONTEXT//////////////////////
export function CreateDeskPrompt():JSX.Element{
    const{prevModal} = useModal();
    const {error, inputAnimation, triggerAnimation} = useInputErrorAnimation();
    const deskContext = useContext(DeskContext);
    const [input,setInput] = useState<string>('');
    const tutorialContext = useContext(TutorialContext);
    const isInputHighlighted = tutorialContext?.currentTarget === 'deskNameInput';
    const isConfirmHighlighted = tutorialContext?.currentTarget === 'confirmDesk';
    
    async function createDeskIn(){
        const newDesk = await createDesk(input);
        deskContext?.refreshDesks();
        if(newDesk){
            deskContext?.switchDesk(newDesk.id);
            if(isConfirmHighlighted) tutorialContext?.nextStep()
            prevModal();            
        }
        else{
            triggerAnimation('choose another name')
        }
    }
    useEnterKey(createDeskIn)
  

    ////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////
    return(
        <>
            <MenuContainer onClose={prevModal}>
                <h2 className="popup-title">Create you Shared (or not) Desk !</h2>
                <p className="popup-subtitle">Invite friends family coworkers or keep it for you only</p>
                <input 
                    className={`ModernInput ${inputAnimation} ${isInputHighlighted ? 'tutorialHighlight' : ''}`}
                    onChange={(input)=>{
                        setInput(input.target.value)
                        if(isInputHighlighted) tutorialContext?.nextStep();
                    }}
                    placeholder="Enter a name for new desk"/>
                <ErrorDisplay error = {error} />
                 <button 
                    className={isConfirmHighlighted ? 'tutorialHighlight' : ''}
                    onClick={createDeskIn}>
                    Create a new desk</button>
            </MenuContainer>
        </>
    )
}