import { useState, type JSX } from "react";
import { CreatingDeskPrompt } from "./creatingDeskPrompt";

export function FunctionsPart():JSX.Element{
    const [creatingPrompt, setCreatingPrompt] = useState<boolean>(false);
    return(
        <div>
            <div className="functionsPart">
            <button id="createUserBtn">👤 Create User</button>
            <button onClick={()=>setCreatingPrompt(true)}>➕ New Desk</button>
            {creatingPrompt && <CreatingDeskPrompt onClose={()=>setCreatingPrompt(false)}/>}
            
            <button id="saveCurrent">💾 Save Desk</button>
            <button id="getLinkBtn">🔗GET LINK</button>
            <button id="socialBtn">👥 Friends</button>
            <button id="shamingTree" className="icon-btn" title="Show Tree">🌳</button>
      </div>
        </div>
    )
}