import { useContext, useState, type JSX } from "react";
import { AccountPart } from "./AccountPart";
import { DeskSide } from "./Deskside";
import { FunctionsPart } from "./FunctionsPart";
import { UserContext } from "../context/UserContext";

export function Sidebar():JSX.Element{
    const userContext = useContext(UserContext);
    const [isToggle,setIsToggle] = useState<boolean>(false)
    return(
        <div className={isToggle? "sidebar expanded" : "sidebar"}>
            <div className="toggleAndLog">
                <button className="sidebar-toggle"  onClick={()=>{
                    setIsToggle(!isToggle);
                }}>☰</button>
                <button onClick={()=>userContext?.logout()}>🔑 Logout</button>
            </div>
            <AccountPart />
            <FunctionsPart />
            <DeskSide />
        </div>
    )
}
