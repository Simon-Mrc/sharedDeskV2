import { useContext, useState, type JSX } from "react";
import { createDesk } from "../api/desk";
import { DeskContext } from "../context/DeskContext";

export function CreatingDeskPrompt({onClose} :{onClose : ()=>void}):JSX.Element{
    const deskContext = useContext(DeskContext);
    const [input,setInput] = useState<string>('');

    async function createDeskIn(){
        createDesk(input);
        deskContext?.refreshDesks();
    }
    return(
        <div className="overlay">
            <div className="PopupWithBlurr">
                <button className="popup-close" onClick={onClose}>✕</button>
                <h2 className="popup-title">Welcome back</h2>
                <p className="popup-subtitle">Log into your account</p>
                <input className="ModernInput"
                 onChange={(input)=>setInput(input.target.value)}
                 placeholder="Enter a name for new desk"/>
                {/* {error && <span className="error">{error}</span>}
                <button onClick={handleLogin}> LOG IN FRIEND !</button> */}
                 <button onClick={createDeskIn}> REGISTER MY FRIEND !</button>
            </div>
        </div>
    )
}