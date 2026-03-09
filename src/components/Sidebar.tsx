import { useState, type JSX } from "react";
import { AccountPart } from "./AccountPart";
import { DeskSide } from "./Deskside";
import { FunctionsPart } from "./FunctionsPart";

export function Sidebar():JSX.Element{
    const [isToggle,setIsToggle] = useState<boolean>(false)
    return(
        <div className={isToggle? "sidebar expanded" : "sidebar"}>
            <div className="toggleAndLog">
                <button className="sidebar-toggle"  onClick={()=>{
                    setIsToggle(!isToggle);
                }}>☰</button>
                <button>🔑 Login</button>
            </div>
            <AccountPart />
            <FunctionsPart />
            <DeskSide />
        </div>
    )
}
