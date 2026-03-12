import { useContext, useState, type JSX } from "react";
import { CreatingDeskPrompt } from "../prompts/creatingDeskPrompt";
import { NotAshamedTree } from "./NotAshamedTree";
import { SocialMenu } from "../social/SocialMenu";
import { UserContext } from "../../context/UserContext";
import { SectionContext } from "../../context/SectionContext";

//////////////////  ROOT OF ALL FUNCTION FROM SIDEBAR UPPER PART  //////////////////
////////////////// NOT MUCH TO COMMENT ON THO PRETTY CLEAR ITSELF //////////////////
export function FunctionsPart():JSX.Element{
    const userContext = useContext(UserContext);
    const [creatingPrompt, setCreatingPrompt] = useState<boolean>(false);
    const [notAshamedTree , setNotAshamedTree] = useState<boolean>(false);
    const [socialMenu , setSocialMenu] = useState<boolean>(false);
    const sectionContext = useContext(SectionContext);
    
    return(
        <div>
            <div className="functionsPart">
            <button id="createUserBtn">👤 Create User</button>
            <button onClick={()=>setCreatingPrompt(true)}>➕ New Desk</button>
            {creatingPrompt && <CreatingDeskPrompt onClose={()=>setCreatingPrompt(false)}/>}
            
            <button id="saveCurrent">💾 Save Desk</button>
            <button id="getLinkBtn">🔗GET LINK</button>
            <button id="socialBtn" onClick={()=>setSocialMenu(true)}>👥 Friends{userContext?.user?.notif.length!=0 && '🔴'}</button>
            {socialMenu &&
            <SocialMenu onClose = {()=> setSocialMenu(false)} />}
            <button id="shamingTree" className="icon-btn" title="Show Tree" onClick={()=>setNotAshamedTree(true)}>🌳</button>
            {notAshamedTree &&
            <NotAshamedTree 
            onClose = {()=> setNotAshamedTree(false)}
            switchSection={(id : string | null)=> sectionContext?.switchSection(id) }
            updateDepth = {(depth : number)=> sectionContext?.updateDepth(depth)}
            />}
      </div>
        </div>
    )
}