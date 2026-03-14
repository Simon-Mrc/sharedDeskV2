import { useContext, useState, type JSX } from "react";
import { UserContext } from "../../context/UserContext";
import { getUserById, updateUserById } from "../../api/user";


//////////////////// ACCOUNT PART PUR JSX NOTHING TO SEE FOR NOW ///////////////////
export function AccountPart():JSX.Element{
    const context= useContext(UserContext);
    const [settingMenu, setSettingMenu] = useState<boolean>(false);
    return(
        <div>
          <div className="sidebar-section">
            <div className="user-display">
              <div className="user-avatar" >?</div>
              <div className="user-info">
                <span id="userNameDisplay" className="user-name">{context?.user?.name ?? "?"}</span>
                <span id="userTypeDisplay" className="user-type"></span>
              </div>
                <button id="accountSetting" onClick={()=> setSettingMenu(true)}>⚙️Account Settings</button>
                {settingMenu && 
                <SettingMenu
                onClose = {()=> setSettingMenu(false)} />}
              </div>
            </div>
        </div>
    )
}



export function SettingMenu ({onClose} : {onClose : ()=>void}) : JSX.Element{

//// CHANGES USERNAME /// CHANGE COLOR /// CHANGE MAIL ? /// BUY PREMIUM ? // CHANGEPASSWORD //CHANGE MAIL ///
  const [userNameMenu,setUserNameMenu] = useState<boolean>(false);
  const userContext = useContext(UserContext);
  const [mailMenu,setMailMenu] = useState<boolean>(false);
  const [passwordMenu,setPasswordMenu] = useState<boolean>(false);
  const [color,setColor] = useState<string>(userContext?.user?.userColor ?? '');
  const [premiumMenu,setPremiumMenu] = useState<boolean>(false);
 
  async function colorHandler(){
    if(userContext?.user){
        const user = userContext.user;
        const updatedUser = {...user, userColor : color}
        userContext.setNewUser(updatedUser);
        await updateUserById(updatedUser);
    }
  }

      ///////////////////////////////////////////////////////////////////////
      /////////////////////// ANIMATION HANDLER PART TO BE REUSED ////////////////
          ////////////////////////////////////////////////////////////////////
          const [animation , setAnimation] = useState<string>('');
              function endwithease(){
                  setTimeout(()=>{
                      setAnimation('fadeOut')
                      setTimeout((()=>{
                          onClose()}),500)
              },1)
          }
      ////////////////////////////////////////////////////////////////////////////////
      ////////////////////////////////////////////////////////////////////////////////
    
      return(
              <div className={`overlay ${animation}`} onClick={()=>endwithease()}>
                  <div className={`PopupWithBlurrOption`} onClick={(e)=>e.stopPropagation()}>

                    {/* Change userColor part */}
                     <div style={{gridColumn: "1 / -1", display : "flex", maxWidth : "100%" }}>
                        <input className="ColorPicker" type="color" value={color}   
                        onChange={(input)=>setColor(input.target.value)} />
                        <button  
                        onClick={()=>{
                        colorHandler()}} 
                        > 🎨</button>
                      </div>

                      {/* <button onClick={()=> setFriendList(true)} >Show FriendList</button>
                      {friendList &&
                      <FriendList 
                      onClose = {()=> setFriendList(false)} 
                      />}
                      <button onClick={()=> setFriendList(true)} >Show FriendList</button>
                      {friendList &&
                      <FriendList 
                      onClose = {()=> setFriendList(false)} 
                      />}
                      <button onClick={()=> setFriendList(true)} >Show FriendList</button>
                      {friendList &&
                      <FriendList 
                      onClose = {()=> setFriendList(false)} 
                      />}
                      <button onClick={()=> setFriendList(true)} >Show FriendList</button>
                      {friendList &&
                      <FriendList 
                      onClose = {()=> setFriendList(false)} 
                      />}
                      <button onClick={()=> setFriendList(true)} >Show FriendList</button>
                      {friendList &&
                      <FriendList 
                      onClose = {()=> setFriendList(false)} 
                      />}
                      <button onClick={()=> setFriendList(true)} >Show FriendList</button>
                      {friendList &&
                      <FriendList 
                      onClose = {()=> setFriendList(false)} 
                      />} */}
                      <button className="popup-closeOption" 
                      style={{gridColumn: "1 / -1", textAlign :"center" }}
                      onClick={endwithease}>✕</button>
                  </div>
              </div>
          )
}

// const [error,setError] = useState('');
// const [inputAnimation , setInputAnimation] = useState<string>('');
// const [userName,setUserName] = useState<string>('');
// const [mail,setMail] = useState<string>('');
// const [password,setPassword] = useState<string>('');
// const [newpPassword,setNewPassword] = useState<string>('');
// const [passwordConfirm,setPasswordConfirm] = useState<string>('');