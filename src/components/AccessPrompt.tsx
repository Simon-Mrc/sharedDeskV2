import { useState, type JSX } from "react";
import type { Item } from "../../shared/types";

export function AccessPrompt({onClose , setHasAccess ,switchSection,updateDepth,setOptionMenu, item, check} : 
    {onClose : ()=>void , setHasAccess : ()=>void, switchSection : ()=>void ,updateDepth : ()=>void , setOptionMenu :() => void  , item : Item , check : number}): JSX.Element {
    const [password, setPassword] = useState<string>('');
    const [error ,setError] = useState<string>('');
    function accessHandler(){
        if(password === item.accessPassword){
            if(check ===1){
                switchSection();
                updateDepth();
            }else{
                setOptionMenu();
            }
            onClose();
        }else{
            setError('Wrong password ! try again')
        }
    }
    return(
        <div className="overlay">
            <div className="PopupWithBlurr">
                <button className="popup-close" onClick={onClose}>✕</button>
                <h2 className="popup-title">Oops it s protected</h2>
                <p className="popup-subtitle">Try to hack it ? </p>
                <input className="ModernInput" type="password"
                onChange={(input)=>setPassword(input.target.value)}
                placeholder="Enter Your Password"/>
                {error && <span className="error">{error}</span>}
                <button onClick={accessHandler}> try me !</button>
            </div>
        </div>
    )

}