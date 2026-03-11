import { useState, type JSX } from "react";
import { CreatingDeskPrompt } from "../prompts/creatingDeskPrompt";
import { NotAshamedTree } from "./NotAshamedTree";
import { SocialMenu } from "../social/SocialMenu";

//////////////////  ROOT OF ALL FUNCTION FROM SIDEBAR UPPER PART  //////////////////
////////////////// NOT MUCH TO COMMENT ON THO PRETTY CLEAR ITSELF //////////////////
export function FunctionsPart():JSX.Element{
    const [creatingPrompt, setCreatingPrompt] = useState<boolean>(false);
    const [notAshamedTree , setNotAshamedTree] = useState<boolean>(false);
    const [socialMenu , setSocialMenu] = useState<boolean>(false)

    return(
        <div>
            <div className="functionsPart">
            <button id="createUserBtn">👤 Create User</button>
            <button onClick={()=>setCreatingPrompt(true)}>➕ New Desk</button>
            {creatingPrompt && <CreatingDeskPrompt onClose={()=>setCreatingPrompt(false)}/>}
            
            <button id="saveCurrent">💾 Save Desk</button>
            <button id="getLinkBtn">🔗GET LINK</button>
            <button id="socialBtn" onClick={()=>setSocialMenu(true)}>👥 Friends</button>
            {socialMenu &&
            <SocialMenu onClose = {()=> setSocialMenu(false)} />}
            <button id="shamingTree" className="icon-btn" title="Show Tree" onClick={()=>setNotAshamedTree(true)}>🌳</button>
            {notAshamedTree &&
            <NotAshamedTree onClose = {()=> setNotAshamedTree(false)}/>}
      </div>
        </div>
    )
}