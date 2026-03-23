import { useContext, useState, type JSX } from "react";
import { NotAshamedTree } from "./NotAshamedTree";
import { SocialMenu } from "../social/SocialMenu";
import { UserContext } from "../../context/UserContext";
import { SectionContext } from "../../context/SectionContext";
import { TutorialContext } from "../../context/TutorialContext";
import { useModal } from "../../context/ModalContext";

//////////////////  ROOT OF ALL FUNCTION FROM SIDEBAR UPPER PART  //////////////////
////////////////// NOT MUCH TO COMMENT ON THO PRETTY CLEAR ITSELF //////////////////
export function FunctionsPart():JSX.Element{
    const {openModal} = useModal()
    const userContext = useContext(UserContext);
    const [notAshamedTree , setNotAshamedTree] = useState<boolean>(false);
    const sectionContext = useContext(SectionContext);
    const tutorialContext = useContext(TutorialContext);
    const isHighlighted = (tutorialContext?.currentTarget === 'createDesk' && tutorialContext.isActive);
    const isTreeHighlighted = (tutorialContext?.currentTarget  === 'folderTree' && tutorialContext.isActive);
    let isConfirmHighlighted = false;
    if (tutorialContext?.step) {isConfirmHighlighted = (tutorialContext?.step>=33 && tutorialContext.isActive) || (userContext?.user?.notif.length !==0) ;}

    return(
        <div  style={tutorialContext?.isActive ? { pointerEvents: "none" } : {}}>
            <div className="functionsPart">
            <button id="createUserBtn">📫 Conversations</button>
            <button
                style={tutorialContext?.isActive ? { pointerEvents: "all" } : {}} 
                className={isHighlighted ? 'tutorialHighlight' : ''}
                onClick={()=>{
                    openModal('createDeskMenu');
                    if(isHighlighted) tutorialContext?.nextStep();
                }}>
                ➕ New Desk</button>

            
            <button id="saveCurrent">💾 Save Desk</button>
            <button id="getLinkBtn">🔗GET LINK</button>
            <button id="socialBtn" 
            className={isConfirmHighlighted ? 'tutorialHighlight' : ''}
            onClick={()=>openModal('socialMenu')}>
                👥 Friends{userContext?.user?.notif.length!=0 && '🔔'}
            </button>
            <button 
                id="shamingTree" 
                className={`icon-btn ${isTreeHighlighted ? 'tutorialHighlight' : ''}`}
                title="Show Tree" 
                onClick={()=>{
                    setNotAshamedTree(!notAshamedTree)
                    if(isTreeHighlighted) tutorialContext?.nextStep()
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