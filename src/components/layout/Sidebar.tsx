import { useContext, useState, type JSX } from "react";
import { AccountPart } from "./AccountPart";
import { DeskSide } from "../desk/Deskside";
import { FunctionsPart } from "./FunctionsPart";
import { UserContext } from "../../context/UserContext";
import { TutorialContext } from "../../context/TutorialContext";

//////////////// PURE JSX SIDEBAR FUNCTION ////// NOT MUCH MORE TO COMMENT ON //////////////////
export function Sidebar():JSX.Element{
    const userContext = useContext(UserContext);
    const [isToggle,setIsToggle] = useState<boolean>(false);
    const tutorialContext = useContext(TutorialContext);
    const isHighlighted = tutorialContext?.currentTarget === 'sidebarToggle'
    return(
        <div className={isToggle? "sidebar expanded" : "sidebar"}>
            <div className="toggleAndLog">
                <button className={`sidebar-toggle ${isHighlighted ? 'tutorialHighlight' : ''}`}  onClick={()=>{
                    setIsToggle(!isToggle);
                    if(isHighlighted) tutorialContext?.nextStep()
                }}>☰</button>
                <button onClick={()=>userContext?.logout()}>🔑 Logout</button>
            </div>
            <AccountPart />
            <FunctionsPart />
            <DeskSide />
        </div>
    )
}
