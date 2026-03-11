import { useContext, type JSX } from "react";
import { UserContext } from "../../context/UserContext";


//////////////////// ACCOUNT PART PUR JSX NOTHING TO SEE FOR NOW ///////////////////
export function AccountPart():JSX.Element{
    const context= useContext(UserContext)
    return(
        <div>
          <div className="sidebar-section">
            <div className="user-display">
              <div className="user-avatar" >?</div>
              <div className="user-info">
                <span id="userNameDisplay" className="user-name">{context?.user?.name ?? "?"}</span>
                <span id="userTypeDisplay" className="user-type"></span>
              </div>
                <button id="accountSetting">⚙️Account Settings</button>
              </div>
            </div>
        </div>
    )
}