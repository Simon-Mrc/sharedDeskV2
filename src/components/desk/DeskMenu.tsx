import { useContext, useState, type JSX } from "react";
import type { Desk } from "../../../shared/types";
import { UserContext } from "../../context/UserContext";

export function DeskMenu ({onClose,selectedDesk} : {onClose : ()=>void , selectedDesk : Desk|null}) : JSX.Element{
    const [input , setInput] = useState<string>('');
    const [inviteMenu , setInviteMenu] = useState<boolean>(false);
    const userContext = useContext(UserContext);
    return(
        <div className="overlay" onClick={()=>onClose()}>
            <div className={`PopupWithBlurrOption`} onClick={(e)=>e.stopPropagation()}>
                <div style={{gridColumn: "1 / -1", display : "flex", maxWidth : "100%" }}>
                    <input className="ModernInput"
                    onChange={(e)=>setInput(e.target.value)}
                    placeholder='Enter your friend Name or userName' />

                    <button style={{maxWidth :"20%"}}>🔍</button>
                </div>
                <button >Invite Friends !</button>
                <button >Quit Desk</button>
                <button >Delete Desk</button>
                <button >Give Desk</button>
                <button className="popup-closeOption" 
                style={{gridColumn: "1 / -1", textAlign :"center" }}
                onClick={onClose}>✕</button>
            </div>
        </div>
    
    )
}