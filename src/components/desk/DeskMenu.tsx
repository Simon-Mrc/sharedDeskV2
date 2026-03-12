import { useContext, useEffect, useState, type JSX } from "react";
import type { Desk } from "../../../shared/types";
import { UserContext } from "../../context/UserContext";
import { InviteMenu } from "./DeskMenuFunctions";

////////////////////////////////////BIG ONE HERE OPTION MENU  ////////////////////////////////////
//////////////////////////// ROOT OF ALL STATE FOR SHAREDDESK MENU FUNCTIONS ////////////////////////////////////
export function DeskMenu ({onClose,selectedDesk} : {onClose : ()=>void , selectedDesk : Desk|null}) : JSX.Element{
    const [input , setInput] = useState<string>('');
    const [inviteMenu , setInviteMenu] = useState<boolean>(false);
    const userContext = useContext(UserContext);


        ///////////////////////////////////////////////////////////////////////
        /////////////////////// ANIMATION HANDLER PART TO BE REUSED ////////////////
            ////////////////////////////////////////////////////////////////////
            const [animation , setAnimation] = useState<string>('');
            useEffect(() => {
                if (animation === 'fadeOut') {
                    const timer = setTimeout(() => {
                        onClose();
                    }, 500); // Match your CSS animation duration
                    return () => clearTimeout(timer); // Cleanup if component unmounts early
                }
            }, [animation, onClose]);
        
            function endwithease() {
                setAnimation('fadeOut'); // Triggers re-render → DOM updates → useEffect fires
            }
        ////////////////////////////////////////////////////////////////////////////////
        ////////////////////////////////////////////////////////////////////////////////

        
    return(
        <div className={`overlay ${animation}`} onClick={()=>endwithease()}>
            <div className={`PopupWithBlurrOption ${animation}`} onClick={(e)=>e.stopPropagation()}>
                <div style={{gridColumn: "1 / -1", display : "flex", maxWidth : "100%" }}>
                    <input className="ModernInput"
                    onChange={(e)=>setInput(e.target.value)}
                    placeholder='Enter your friend Name or userName' />

                    <button style={{maxWidth :"20%"}}>🔍</button>
                </div>
                <button onClick={()=>setInviteMenu(true)}>Invite Friends !</button>
                {inviteMenu&&
                <InviteMenu 
                onClose={()=>setInviteMenu(false)}
                selectedDesk = {selectedDesk}/>}
                <button >Quit Desk</button>
                <button >Delete Desk</button>
                <button >Give Desk</button>
                <button className="popup-closeOption" 
                style={{gridColumn: "1 / -1", textAlign :"center" }}
                onClick={endwithease}>✕</button>
            </div>
        </div>
    
    )
}