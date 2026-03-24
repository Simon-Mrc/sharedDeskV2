import { useContext, useState, type JSX } from "react";
import { UserContext } from "../../context/UserContext";
import { updateUserById } from "../../api/user";
import { MenuContainer } from "../../modals/Modal";
import { MessageDisplay } from "../ui/MessageDipslay";
import { useMessage } from "../../customHooks/useMessage";
import { useInputErrorAnimation } from "../../customHooks/useAnimation";
import { ErrorDisplay } from "../ui/ErrorDisplay";
import { useModal } from "../../context/ModalContext";


//////////////////// ACCOUNT PART PUR JSX NOTHING TO SEE FOR NOW ///////////////////
export function AccountPart():JSX.Element{
    const context= useContext(UserContext);
    const {openModal} = useModal()
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
                <button id="accountSetting" onClick={()=> openModal('accountSettingMenu')}>⚙️Account Settings</button>
              </div>
            </div>
        </div>
    )
}



export function AccountSettingMenu () : JSX.Element{

//// CHANGES USERNAME /// CHANGE COLOR /// CHANGE MAIL ? /// BUY PREMIUM ? // CHANGEPASSWORD //CHANGE MAIL ///
  const userContext = useContext(UserContext);
  const {prevModal, openModal} = useModal();
  const {message,triggerKey,showMessage} = useMessage();
  const {error : errorMail, inputAnimation : inputAnimationMail, triggerAnimation : triggerAnimationMail} = useInputErrorAnimation();
  const [mailInput,setMailInput] = useState<string>('');
  
  const {error : errorName, inputAnimation : inputAnimationName, triggerAnimation : triggerAnimationName} = useInputErrorAnimation();
  const [userNameInput,setUserNameInput] = useState<string>('');

  const [passwordMenu,setPasswordMenu] = useState<boolean>(false);
  
  const [premiumMenu,setPremiumMenu] = useState<boolean>(false);
  
  const [avatarMenu, setAvatarMenu] = useState<boolean>(false);  

  const [color,setColor] = useState<string>(userContext?.user?.userColor ?? '');

  async function colorHandler(){
    if(userContext?.user){
      setCheck(1);
      showMessage('Color changed with success !');
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
          setCheck(2);
          userContext?.setNewUser(newUser);
          showMessage('UserName changed with success');
        }else{
          triggerAnimationName('userName already taken ! try to be original for once');
        }
      }catch(error){
        triggerAnimationName('userName already taken ! try to be original for once');
        return;
      }
    }else{
      triggerAnimationName('You have to login first (i actually don t even know how you get there without !)' )
    }
  }

  async function changeMailHandler(){
    if(userContext?.user){
      const newUser = {...userContext?.user, mail : mailInput};
      try{
        const nUser = await updateUserById(newUser);
        if(nUser?.message){
          setCheck(3);
          userContext?.setNewUser(newUser);
          showMessage('Mail changed with success')
        }else{
          triggerAnimationMail('There is already an account with this mail adress');
        }
      }catch(error){
        triggerAnimationMail('There is already an account with this mail adress');
        return;
      }     
    }else{
      triggerAnimationMail('You have to login first (i actually don t even know how you get there without !)' )
    }
  }

  const [check,setCheck] = useState<number>(0);
      
      ////////////////////////////////////////////////////////////////////////////////
      ////////////////////////////////////////////////////////////////////////////////
    
  return(
    <>
      <MenuContainer onClose={prevModal}>  
        <div style={{gridColumn: "1 / -1", display : "flex", maxWidth : "100%" }}>
         </div> 
            {/* Change userColor part */}
            <div style={{gridColumn: "1 / -1", display : "flex", maxWidth : "100%" }}>
              <input className="ColorPicker" type="color" value={color}   
              onChange={(input)=>setColor(input.target.value)} />
              <button  
              onClick={()=>{
              colorHandler();
              }} 
              > 🎨</button>
            </div>
            {check === 1 &&
            <MessageDisplay message={message} clock = {4000} triggerKey={triggerKey} /> }
    
              {/* Change userName part */}
            <div style={{gridColumn: "1 / -1", display : "flex", maxWidth : "100%" }}>
              <input    
              className={check === 2 ? `ModernInput  ${inputAnimationName}` :`ModernInput`}
              onChange={(input)=>setUserNameInput(input.target.value)} 
              value = {userNameInput}
              placeholder="Enter your new userName"/>
              <button  
              onClick={async ()=>{
              changeUserNameHandler();
              setUserNameInput('');
              }} 
              > 🎨</button>
            </div>
              <ErrorDisplay error = {errorName}/>
              {check === 2 &&
              <MessageDisplay message={message} clock = {4000} triggerKey={triggerKey} /> }

    
                          {/* Change mail part */}
            <div style={{gridColumn: "1 / -1", display : "flex", maxWidth : "100%" }}>
              <input    
              className={`ModernInput ${inputAnimationMail}`}
              onChange={(input)=>setMailInput(input.target.value)}
              value={mailInput} 
              placeholder="Enter your new mailadress"/>
              <button  
              onClick={async ()=>{
              await changeMailHandler();
              setMailInput('');
              }
              } 
              > 🎨</button>
            </div>
            <ErrorDisplay error={errorMail}/>
            {check === 3 &&
            <MessageDisplay message={message} clock = {4000} triggerKey={triggerKey} /> }

    
                      {/* Set avatar part */}
            <button onClick={()=> openModal('avatarMenu')} >Change Avatar</button>
            
                          
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

