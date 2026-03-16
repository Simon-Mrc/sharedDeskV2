import { useContext, useState, type JSX } from "react";
import { CreatingDeskPrompt } from "../prompts/creatingDeskPrompt";
import { NotAshamedTree } from "./NotAshamedTree";
import { SocialMenu } from "../social/SocialMenu";
import { UserContext } from "../../context/UserContext";
import { SectionContext } from "../../context/SectionContext";
import { TutorialContext } from "../../context/TutorialContext";

//////////////////  ROOT OF ALL FUNCTION FROM SIDEBAR UPPER PART  //////////////////
////////////////// NOT MUCH TO COMMENT ON THO PRETTY CLEAR ITSELF //////////////////
export function FunctionsPart():JSX.Element{
    const userContext = useContext(UserContext);
    const [creatingPrompt, setCreatingPrompt] = useState<boolean>(false);
    const [notAshamedTree , setNotAshamedTree] = useState<boolean>(false);
    const [socialMenu , setSocialMenu] = useState<boolean>(false);
    const sectionContext = useContext(SectionContext);
    const tutorialContext = useContext(TutorialContext);
    const isHighlighted = (tutorialContext?.currentTarget === 'createDesk' && tutorialContext.isActive);
    const isTreeHighlighted = (tutorialContext?.currentTarget  === 'folderTree' && tutorialContext.isActive);
    
    return(
        <div  style={tutorialContext?.isActive ? { pointerEvents: "none" } : {}}>
            <div className="functionsPart">
            <button id="createUserBtn">📫 Conversations</button>
            <button
                style={tutorialContext?.isActive ? { pointerEvents: "all" } : {}} 
                className={isHighlighted ? 'tutorialHighlight' : ''}
                onClick={()=>{
                    setCreatingPrompt(true);
                    if(isHighlighted) tutorialContext?.nextStep()  // ← step 2 → 3
                }}>
                ➕ New Desk</button>
            {creatingPrompt && <CreatingDeskPrompt onClose={()=>setCreatingPrompt(false)}/>}
            
            <button id="saveCurrent">💾 Save Desk</button>
            <button id="getLinkBtn">🔗GET LINK</button>
            <button id="socialBtn" onClick={()=>setSocialMenu(true)}>👥 Friends{userContext?.user?.notif.length!=0 && '🔔'}</button>
            {socialMenu &&
            <SocialMenu onClose = {()=> setSocialMenu(false)} />}
            <button 
                id="shamingTree" 
                className={`icon-btn ${isTreeHighlighted ? 'tutorialHighlight' : ''}`} // ← ADD class
                title="Show Tree" 
                onClick={()=>{
                    setNotAshamedTree(!notAshamedTree)
                    if(isTreeHighlighted) tutorialContext?.nextStep() // ← ADD : step 18 → 19
                }}>
                🌳
            </button>
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