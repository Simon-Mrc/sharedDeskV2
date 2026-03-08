import type { JSX } from "react";

export function FunctionsPart():JSX.Element{
    return(
        <div>
            <div className="functionsPart">
            <button id="createUserBtn">👤 Create User</button>
            <button id="newDeskBtn">➕ New Desk</button>
            <button id="saveCurrent">💾 Save Desk</button>
            <button id="getLinkBtn">🔗GET LINK</button>
            <button id="socialBtn">👥 Friends</button>
            <button id="shamingTree" className="icon-btn" title="Show Tree">🌳</button>
      </div>
        </div>
    )
}