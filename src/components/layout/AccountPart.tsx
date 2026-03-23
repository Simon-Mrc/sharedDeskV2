import { useContext, useEffect, useState, type JSX } from "react";
import { UserContext } from "../../context/UserContext";
import { updateUserById } from "../../api/user";
import { AvatarMenu } from "../userAndAccount/AccountFunctions";
import { MenuContainer } from "../../modals/Modal";


//////////////////// ACCOUNT PART PUR JSX NOTHING TO SEE FOR NOW ///////////////////
export function AccountPart():JSX.Element{
    const context= useContext(UserContext);
    const [settingMenu, setSettingMenu] = useState<boolean>(false);
    return(
        <div>
          <div className="sidebar-section">
            <div className="user-display">
              <div className="user-avatar" >
                <img src={`../backend/${context?.user?.avatarFilePath}`}></img>
              </div>
              <div className="user-info">
                <span id="userNameDisplay" className="user-name">{context?.user?.userName ?? "?"}</span>
                <span id="userTypeDisplay" className="user-type"></span>
              </div>
                <button id="accountSetting" onClick={()=> setSettingMenu(true)}>⚙️Account Settings</button>
                {settingMenu && 
                <AccountSettingMenu
                onClose = {()=> setSettingMenu(false)} />}
              </div>
            </div>
        </div>
    )
}



export function AccountSettingMenu ({onClose} : {onClose : ()=>void}) : JSX.Element{

//// CHANGES USERNAME /// CHANGE COLOR /// CHANGE MAIL ? /// BUY PREMIUM ? // CHANGEPASSWORD //CHANGE MAIL ///
  const userContext = useContext(UserContext);
  
  const [userNameInfo,setUserNameInfo] = useState<boolean>(false);
  const [userNameInput,setUserNameInput] = useState<string>('');
  const [errorName,setErrorName] = useState<string|null>(null);
  const [inputNameAnimation , setInputNameAnimation] = useState<string>('');
  
  const [mailInfo,setMailInfo] = useState<boolean>(false);
  const [mailInput,setMailInput] = useState<string>('');
  const [errorMail,setErrorMail] = useState<string|null>(null);
  const [inputMailAnimation , setInputMailAnimation] = useState<string>('');
  
  const [passwordMenu,setPasswordMenu] = useState<boolean>(false);
  
  const [premiumMenu,setPremiumMenu] = useState<boolean>(false);
  
  const [avatarMenu, setAvatarMenu] = useState<boolean>(false);  

  const [color,setColor] = useState<string>(userContext?.user?.userColor ?? '');
  const [colorInfo,setColorInfo] = useState<boolean>(false);

  async function colorHandler(){
    if(userContext?.user){
        const user = userContext.user;
        const updatedUser = {...user, userColor : color}
        userContext.setNewUser(updatedUser);
        await updateUserById(updatedUser);
    }
  }
  async function changeUserNameHandler(){
    if(userContext?.user){
      const newUser = {...userContext?.user, userName : userNameInput};
      try{
        const nUser = await updateUserById(newUser);
        if(nUser?.message){
          userContext?.setNewUser(newUser);
          setUserNameInfo(true);
          setTimeout(()=>{
            setUserNameInfo(false);
          },4000)
        }else{
          setErrorName('userName already taken ! try to be original for once');
          setInputNameAnimation('shake');
          setTimeout(()=>{
            setInputNameAnimation('');
        },1500)
        }
      }catch(error){
        setErrorName('userName already taken ! try to be original for once');
        setInputNameAnimation('shake');
        setTimeout(()=>{
          setInputNameAnimation('');
        },1500)
        return;
      }
     
    }else{
      setErrorName('You have to login first (i actually don t even know how you get there without !)' )
    }
  }

  async function changeMailHandler(){
    if(userContext?.user){
      const newUser = {...userContext?.user, mail : mailInput};
      try{
        const nUser = await updateUserById(newUser);
        if(nUser?.message){
          userContext?.setNewUser(newUser);
          setMailInfo(true);
          setTimeout(()=>{
            setMailInfo(false);
          },4000)
        }else{
          setErrorMail('There is already an account with this mail adress');
          setInputMailAnimation('shake');
          setTimeout(()=>{
            setInputMailAnimation('');
          },1500)
        }
      }catch(error){
        setErrorMail('There is already an account with this mail adress');
        setInputMailAnimation('shake');
        setTimeout(()=>{
          setInputMailAnimation('');
        },1500)
        return;
      }     
    }else{
      setErrorName('You have to login first (i actually don t even know how you get there without !)' )
    }
  }


      ///////////////////////////////////////////////////////////////////////
      /////////////////////// ANIMATION HANDLER PART TO BE REUSED ////////////////
          ////////////////////////////////////////////////////////////////////

          const [colorAnimation , setColorAnimation] = useState<string>('');
            useEffect(()=>{
              if(colorAnimation==='fadeIn tutorialMessageText'){
                const timer = setTimeout(()=>{
                  setTimeout(()=>{
                    setColorAnimation('fadeOut');
                    setTimeout((()=>{
                        setColorInfo(false);
                        setUserNameInfo(false);
                      }),500)
            },1)
                },2000)
                return ()=> clearTimeout(timer);
              }
            },[colorAnimation]);
      
      ////////////////////////////////////////////////////////////////////////////////
      ////////////////////////////////////////////////////////////////////////////////
    
  return(
    <>
      <MenuContainer onClose={onClose}>
    
        <div style={{gridColumn: "1 / -1", display : "flex", maxWidth : "100%" }}>
         </div> 
            {/* Change userColor part */}
            <div style={{gridColumn: "1 / -1", display : "flex", maxWidth : "100%" }}>
            <input className="ColorPicker" type="color" value={color}   
              onChange={(input)=>setColor(input.target.value)} />
              <button  
              onClick={()=>{
              colorHandler();
              setColorInfo(true)
              setColorAnimation('fadeIn tutorialMessageText')}} 
              > 🎨</button>
              </div>
                {colorInfo && 
                <div className={`${colorAnimation}`} style={{gridColumn: "1 / -1", display : "flex", maxWidth : "100%" }}>
                  Color changed with success !   
                </div>}
    
              {/* Change userName part */}
              <div style={{gridColumn: "1 / -1", display : "flex", maxWidth : "100%" }}>
                <input    
                className={`ModernInput ${inputNameAnimation}`}
                onChange={(input)=>setUserNameInput(input.target.value)} 
                value = {userNameInput}
                placeholder="Enter your new userName"/>
                <button  
                onClick={async ()=>{
                changeUserNameHandler();
                setUserNameInput('');
                setUserNameInfo(true);
                setColorAnimation('fadeIn tutorialMessageText')}} 
                > 🎨</button>
                </div>
                  {errorName && 
                  <div className="PopupInside" style={{gridColumn: "1 / -1", textAlign :"center" }}>
                    <span  className="error">{errorName}</span>
                  </div>
                  }
                {userNameInfo && 
                  <div className={`${colorAnimation}`} style={{gridColumn: "1 / -1", display : "flex", maxWidth : "100%" }}>
                   UserName changed with success !   
                </div>}
    
                          {/* Change mail part */}
                <div style={{gridColumn: "1 / -1", display : "flex", maxWidth : "100%" }}>
                  <input    
                  className={`ModernInput ${inputMailAnimation}`}
                  onChange={(input)=>setMailInput(input.target.value)}
                  value={mailInput} 
                  placeholder="Enter your new mailadress"/>
                  <button  
                  onClick={async ()=>{
                    await changeMailHandler();
                    setMailInput('');
                    setColorAnimation('fadeIn tutorialMessageText')
                  }
                  } 
                  > 🎨</button>
                </div>
                          {errorMail && 
                              <div className="PopupInside" style={{gridColumn: "1 / -1", textAlign :"center" }}>
                              <span  className="error">{errorMail}</span>
                            </div>
                          }
                          {mailInfo && 
                          <div className={`${colorAnimation}`} style={{gridColumn: "1 / -1", display : "flex", maxWidth : "100%" }}>
                          Mail changed with success !   
                          </div>}
    
                          {/* Set avatar part */}
                          <button onClick={()=> setAvatarMenu(true)} >Change Avatar</button>
                          {avatarMenu &&
                          <AvatarMenu 
                          onClose = {()=> setAvatarMenu(false)} 
                          />}
                          
                          {/* Change password part */}
                           {/* <button onClick={()=> setPasswordMenu(true)} >Change password</button>
                          {passwordMenu &&
                          <FriendList 
                          onClose = {()=> setPasswordMenu(false)} 
                          />}
                          */}
                          {/* Change account type */}
                          {/* <button onClick={()=> setPremiumMenu(true)} >Show FriendList</button>
                          {premiumMenu &&
                          <FriendList 
                          onClose = {()=> setPremiumMenu(false)} 
                          />} */}
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
                          />} */}

      </MenuContainer>
    </>         
  )
}

