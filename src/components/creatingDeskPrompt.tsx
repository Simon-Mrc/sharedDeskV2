import { useContext, useState, type JSX } from "react";
import { createDesk } from "../api/desk";
import { DeskContext } from "../context/DeskContext";

export function CreatingDeskPrompt({onClose} :{onClose : ()=>void}):JSX.Element{
    const deskContext = useContext(DeskContext);
    const [input,setInput] = useState<string>('');
    const [error, setError] = useState<string>('')

    async function createDeskIn(){
        const newDesk = await createDesk(input);
        deskContext?.refreshDesks();
        console.log(newDesk);
        if(newDesk){
            console.log(newDesk.id);
            deskContext?.switchDesk(newDesk.id);
            onClose();            
        }
        else{
            setError('Choose another name ! ')
        }
    }
    return(
        <div className="overlay">
            <div className="PopupWithBlurr">
                <button className="popup-close" onClick={onClose}>✕</button>
                <h2 className="popup-title">Create you Shared (or not) Desk !</h2>
                <p className="popup-subtitle">Invite friends family coworkers or keep it for you only</p>
                <input className="ModernInput"
                 onChange={(input)=>setInput(input.target.value)}
                 placeholder="Enter a name for new desk"/>
                {error && <span className="error">{error}</span>}
                 <button onClick={createDeskIn}> Create a new desk</button>
            </div>
        </div>
    )
}