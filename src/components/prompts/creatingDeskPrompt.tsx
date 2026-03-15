import { useContext, useState, type JSX } from "react";
import { createDesk } from "../../api/desk";
import { DeskContext } from "../../context/DeskContext";

/////////////// CREATING DESK PROMPT ////////////////// SWITCH CURRENT DESK ON CREATION : DESKCONTEXT//////////////////////
export function CreatingDeskPrompt({onClose} :{onClose : ()=>void}):JSX.Element{
    
    const deskContext = useContext(DeskContext);
    const [input,setInput] = useState<string>('');
    const [error, setError] = useState<string>('');
    const [inputAnimation, setInputAnimation] = useState<string>('');
    
    async function createDeskIn(){
        const newDesk = await createDesk(input);
        deskContext?.refreshDesks();
        if(newDesk){
            console.log(newDesk.id);
            deskContext?.switchDesk(newDesk.id);
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
                <input className={`ModernInput ${inputAnimation}`}
                 onChange={(input)=>setInput(input.target.value)}
                 placeholder="Enter a name for new desk"/>
                 {error && 
                 <div className="PopupInside" style={{gridColumn: "1 / -1", textAlign :"center" }}>
                 <span  className="error fadeIn">{error}</span>
                 </div>
                }
                 <button onClick={createDeskIn}> Create a new desk</button>
            </div>
        </div>
    )
}