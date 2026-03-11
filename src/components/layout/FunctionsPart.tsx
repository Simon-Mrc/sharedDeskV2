import { useState, type JSX } from "react";
import { CreatingDeskPrompt } from "../prompts/creatingDeskPrompt";
import { NotAshamedTree } from "./NotAshamedTree";

export function FunctionsPart():JSX.Element{
    const [creatingPrompt, setCreatingPrompt] = useState<boolean>(false);
    const [notAshamedTree , setNotAshamedTree] = useState<boolean>(false);

    return(
        <div>
            <div className="functionsPart">
            <button id="createUserBtn">👤 Create User</button>
            <button onClick={()=>setCreatingPrompt(true)}>➕ New Desk</button>
            {creatingPrompt && <CreatingDeskPrompt onClose={()=>setCreatingPrompt(false)}/>}
            
            <button id="saveCurrent">💾 Save Desk</button>
            <button id="getLinkBtn">🔗GET LINK</button>
            <button id="socialBtn">👥 Friends</button>
            <button id="shamingTree" className="icon-btn" title="Show Tree" onClick={()=>setNotAshamedTree(true)}>🌳</button>
            {notAshamedTree &&
            <NotAshamedTree onClose = {()=> setNotAshamedTree(false)}/>}
      </div>
        </div>
    )
}