import { useContext, useState, type JSX } from "react";
import { createDesk } from "../../api/desk";
import { DeskContext } from "../../context/DeskContext";
import { TutorialContext } from "../../context/TutorialContext";

/////////////// CREATING DESK PROMPT ////////////////// SWITCH CURRENT DESK ON CREATION : DESKCONTEXT//////////////////////
export function CreatingDeskPrompt({onClose} :{onClose : ()=>void}):JSX.Element{
    
    const deskContext = useContext(DeskContext);
    const [input,setInput] = useState<string>('');
    const [error, setError] = useState<string>('');
    const [inputAnimation, setInputAnimation] = useState<string>('');
    const tutorialContext = useContext(TutorialContext);
    const isInputHighlighted = tutorialContext?.currentTarget === 'deskNameInput';
    const isConfirmHighlighted = tutorialContext?.currentTarget === 'confirmDesk';
    
    async function createDeskIn(){
        const newDesk = await createDesk(input);
        deskContext?.refreshDesks();
        if(newDesk){
            deskContext?.switchDesk(newDesk.id);
            if(isConfirmHighlighted) tutorialContext?.nextStep()
            endwithease();            
        }
        else{
            setError('Choose another name ! ')
            setInputAnimation('shake');
            setTimeout(()=>{
                setInputAnimation('')
            },500)  
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
        <div className={`overlay ${animation}`} onClick={endwithease}>
            <div className="PopupWithBlurr" onClick={(e)=>{e.stopPropagation()}}>
                <button className="popup-close" onClick={endwithease}>✕</button>
                <h2 className="popup-title">Create you Shared (or not) Desk !</h2>
                <p className="popup-subtitle">Invite friends family coworkers or keep it for you only</p>
                <input 
                    className={`ModernInput ${inputAnimation} ${isInputHighlighted ? 'tutorialHighlight' : ''}`}
                    onChange={(input)=>{
                        setInput(input.target.value)
                        setTimeout(()=>{
                            if(isInputHighlighted) tutorialContext?.nextStep()  // ← step 3 → 4

                        },1000)
                    }}
                    placeholder="Enter a name for new desk"/>
                 {error && 
                 <div className="PopupInside" style={{gridColumn: "1 / -1", textAlign :"center" }}>
                 <span  className="error fadeIn">{error}</span>
                 </div>
                }
                 <button 
                    className={isConfirmHighlighted ? 'tutorialHighlight' : ''}
                    onClick={createDeskIn}>
                     Create a new desk</button>
            </div>
        </div>
    )
}