import { useContext, useEffect, useState, type JSX } from "react";
import type { User } from "../../../shared/types";
import { UserContext } from "../../context/UserContext";
import { getUserById, updateUserById } from "../../api/user";

////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////// SEARCH FRIEND AND SEND INVITE PART ////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////

///////////////////////////////// SEARCH FRIEND PART ///////////////////////////////////
export function SearchFriend({onClose , arrayOfFriends} : {onClose : ()=>void , arrayOfFriends : Omit<User,'password'>[]|null}): JSX.Element{
    const [inviteMenu , setInviteMenu] = useState<boolean>(false);
    const [currentFriend , setCurrentFriend] = useState<Omit<User,'password'>|null>(null);
    const userContext = useContext(UserContext);

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
            <div className="PopupWithBlurrOption" onClick={(e)=>e.stopPropagation()}>
                {arrayOfFriends?.map((user)=>!userContext?.user?.friendList.includes(user.id) && (
                    <div key= {user.id}>
                        <button style={{border: `1.5px solid ${user.userColor}`}}
                        onClick={()=>{
                            setCurrentFriend(user);
                            setInviteMenu(true);
                        }
                        }>{user.userName}</button>
                    </div>
                ))}
                {inviteMenu &&
                <InviteMenu 
                onClose = {()=>setInviteMenu(false)}
                currentFriend = {currentFriend}
                />
                }
                <button className="popup-closeOption" 
                style={{gridColumn: "1 / -1", textAlign :"center" }}
                onClick={endwithease}>✕</button>
            </div>
        </div>
    )
}

///////////////////////////////// SEND INVITE PART ///////////////////////////////////
export function InviteMenu({onClose,currentFriend} : {onClose : ()=>void, currentFriend : Omit<User,'password'>|null}) : JSX.Element{
    const userContext = useContext(UserContext);
    const [animation,setAnimation] = useState<string>('');
    const [error , setError] = useState<string>('');
    async function inviteHandler(){
        if(userContext?.user && currentFriend){
            if(currentFriend?.notif.includes(userContext?.user?.id) || currentFriend?.friendList?.includes(userContext?.user?.id)){
                setError('He is already your friend or you already send an invite');
                setTimeout(()=>{
                    setError('');
                },1500)

            }else{
                const newArray = [...currentFriend.notif,userContext.user.id];
                currentFriend.notif = newArray;
                await updateUserById(currentFriend);
                setError('Invite sent =D');
                setTimeout(()=>{
                    onClose();
                },1500)
            }
        }
    }

    ///////////////////////////////////////////////////////////////////////
    /////////////////////// ANIMATION HANDLER PART TO BE REUSED ////////////////
        ////////////////////////////////////////////////////////////////////
        const [animationd , setAnimationd] = useState<string>('');
            function endwithease(){
                setTimeout(()=>{
                    setAnimationd('fadeOut')
                    setTimeout((()=>{
                        onClose()}),500)
            },1)
        }
    ////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////
  
    return(
        <div className={`overlay ${animationd}`} onClick={()=>endwithease()}>
            <div className="PopupWithBlurrOption" onClick={(e)=>{
                e.stopPropagation()
            }}>
                <button style={{gridColumn: "1 / -1", textAlign :"center" ,border: `3px solid ${currentFriend?.userColor}`}}
                onClick={()=>inviteHandler()}
                >{`you wish to invite ${currentFriend?.userName}?`}</button>
                {error && 
                 <div className="PopupInside" style={{gridColumn: "1 / -1", textAlign :"center" }}>
                 <span  className="error">{error}</span>
                 </div>
                }
                <button className="popup-closeOption" 
                style={{gridColumn: "1 / -1", textAlign :"center" }}
                onClick={endwithease}>✕</button>
            </div>
        </div>
    )
}

////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////// SHOW NOTIFS AND ACCEPT FRIEND PART  ////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////

///////////////////////////////////////// SHOW NOTIF PART /////////////////////////////////////
export function Invit({onClose} : {onClose : ()=>void}) : JSX.Element{
    const userContext = useContext(UserContext);
    const [arrayOfFriend , setArrayOfFriend] = useState<(Omit<User,'password'>|null)[]>([])
  ////////////////// REUPDATE ON EACH CHANGE OF NOTIF ARRAY /////////////////// 
    useEffect(()=>{
            if(userContext?.user?.notif.length ===0){
                setError('You have no invite you lonely fck');
                setArrayOfFriend([]);
                return
            }else{
                async function fetchFriend(){
                    if(userContext && userContext.user){
                        const safeArray = await Promise.all(userContext.user.notif.map((friendId)=>getUserById(friendId)));
                        setArrayOfFriend(safeArray);
                    }
                }
                fetchFriend();
            }
    },[userContext?.user?.notif.length]) // Interesting here Is dependenci is an array, react compares references and not values !
                                    // So you need to change compare length wich is a number to trigger useEffect.
    const [selectedUser , setSelectedUser] = useState<Omit<User,'password'>|null>(null);
    const [acceptOrNot , setAcceptOrNot] = useState<boolean>(false);
    const [error,setError] = useState<string>('');

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
            <div className="PopupWithBlurrOption" onClick={(e)=>{
                e.stopPropagation()
            }}>
                {arrayOfFriend?.map((friend)=> (friend&&
                    <button style={{border: `3px solid ${friend.userColor}`}}
                    onClick={()=>{
                        setSelectedUser(friend);
                        setAcceptOrNot(true);
                    }
                    }>{friend?.userName}</button>
                ))}

                {acceptOrNot &&
                <AcceptOrNot
                onClose = {()=> setAcceptOrNot(false)}
                selectedUser = {selectedUser}
                />}

                {error && 
                 <div className="PopupInside" style={{gridColumn: "1 / -1", textAlign :"center" }}>
                 <span  className="error">{error}</span>
                 </div>
                }
                <button className="popup-closeOption" 
                style={{gridColumn: "1 / -1", textAlign :"center" }}
                onClick={endwithease}>✕</button>
            </div>
        </div>

    )
}
 /////////////////////////////// ACCEPT OR NOT PART /////////////////////////////////////
export function AcceptOrNot ({onClose,selectedUser} : {onClose : ()=>void , selectedUser : Omit<User,'password'>|null}) : JSX.Element{
    const userContext = useContext(UserContext);
    const currentUser = userContext?.user;
    const [error,setError] = useState<string>('');

    async function acceptHandler(accepted : boolean){ // boolean as a param because of promise fetch 

            if(selectedUser && currentUser){
                if(currentUser.friendList.includes(selectedUser.id)){
                    setError('He is already your friend and god know why!');
                    const newNotif = currentUser.notif.filter((u)=> {if(u!==selectedUser.id){return u}})
                    currentUser.notif = newNotif;
    //////////////////////////////UPDATE IN DB /////////////////////////////////
                    await updateUserById(currentUser);  
                    userContext.setNewUser(currentUser);
                    return;
                }
                if(accepted){
                    currentUser.friendList.push(selectedUser.id);
                    selectedUser.friendList.push(currentUser.id);
                    const newNotif = currentUser.notif.filter((u)=> {if(u!==selectedUser.id){return u}})
                    // const newNotif = currentUser.friendList.filter((u) => u !== selectedUser.id);
                    currentUser.notif = newNotif;
    //////////////////////////////UPDATE IN DB /////////////////////////////////
                    await updateUserById(currentUser);
                    userContext.setNewUser(currentUser);
                    await updateUserById(selectedUser);
                }else{
                    const newNotif = currentUser.friendList.filter((u)=> {if(u!==selectedUser.id){return u}})
                    currentUser.notif = newNotif;
    //////////////////////////////UPDATE IN DB /////////////////////////////////
                    await updateUserById(currentUser);  
                    userContext.setNewUser(currentUser);
                }    
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
    <div className={`overlay`} onClick={()=>endwithease()}>
        <div className="PopupWithBlurrOption" onClick={(e)=>{
            e.stopPropagation()
        }}>
            <button style={{border: `3px solid #02a32b`}}
                    onClick={async()=>{
                        await acceptHandler(true);
                        endwithease()
                    }
                    }>{`Accept ${selectedUser?.userName} as a friend`}</button>
            <button style={{border: `3px solid #a33002`}}
                    onClick={async ()=>{
                        await acceptHandler(false);
                        endwithease();
                    }
                    }>{`Refuse ${selectedUser?.userName} as a friend`}</button>
            
            {error && 
             <div className="PopupInside" style={{gridColumn: "1 / -1", textAlign :"center" }}>
             <span  className="error">{error}</span>
             </div>
            }
            <button className="popup-closeOption" 
            style={{gridColumn: "1 / -1", textAlign :"center" }}
            onClick={endwithease}>✕</button>
        </div>
    </div>
    )
}
////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////// SHOW FRIEND LIST AND OPEN FRIEND MENU PART ////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////

///////////////////////////////////// SHOW ALL FRIENDS PART ////////////////////////////
export function FriendList({onClose} : {onClose : ()=>void}) : JSX.Element{
    const userContext = useContext(UserContext);
    const [error, setError] = useState<string>("");
    const [arrayOfFriend , setArrayOffFriends] = useState<(Omit<User , 'password'>|null)[]>([]);
    const [selectedFriend , setSelectedFriend] = useState<Omit<User,'password'>|null>(null);
    const [friendMenu , setFriendMenu] = useState<boolean>(false);

  ////// FRIEND LIST HANDLER TO RETURN ALL USER OBJECT FROM FRIEND LIST /////////
    async function friendsHandler(){
        if(userContext?.user){
            if(!userContext.user.friendList.length){
                setError('You have no friend and probably never will');
                setArrayOffFriends([]);
                return;
            }else{
                const newArray = await Promise.all(userContext.user.friendList.map((friend)=>getUserById(friend)))
                setArrayOffFriends(newArray);
                return;
            }
        }
    }
///////////// TRIGGER FRIENDSHANDLER EVERYTIME FRIENDLIST CHANGES ///////////
    useEffect(()=>{
        friendsHandler();
    },[userContext?.user?.friendList.length])

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
  
/////////////////////////////////JSX PART //////////////////////////////
    return(
    <div className={`overlay ${animation}`} onClick={()=>endwithease()}>
        <div className="PopupWithBlurrOption" onClick={(e)=>{
            e.stopPropagation()
        }}>
            {arrayOfFriend.map((user)=>(
                <button style={{border: `3px solid ${user?.userColor}`}}
                onClick={()=>{
                    setSelectedFriend(user);
                    setFriendMenu(true);
                }}>{user?.userName}</button>
            ))}
            {friendMenu&&
            <FriendMenu 
                onClose = {()=> setFriendMenu(false)}
                selectedFriend = {selectedFriend} />
            }
            {error && 
             <div className="PopupInside" style={{gridColumn: "1 / -1", textAlign :"center" }}>
             <span  className="error">{error}</span>
             </div>
            }
            <button className="popup-closeOption" 
            style={{gridColumn: "1 / -1", textAlign :"center" }}
            onClick={endwithease}>✕</button>
        </div>
    </div>
    )
}

/////////////////////////////////////// SHOW FRIEND MENU PART //////////////////////////
export function FriendMenu({onClose, selectedFriend} : {onClose : ()=>void, selectedFriend: Omit<User,'password'>|null}) : JSX.Element{
    const userContext = useContext(UserContext);
    const [error, setError] = useState<string>('');
    async function deleteHandler(){
        if(selectedFriend){
            if(userContext?.user?.friendList.includes(selectedFriend?.id)){
                //////////// MODIFY FRIENDLISTS //////////////////
                const newUserArray = userContext.user.friendList.filter((e)=>{if(e!==selectedFriend.id){return e}});
                const updatedUser : Omit<User,'password'> = {...userContext.user, friendList : newUserArray}
                userContext.setNewUser(updatedUser);
                const newFriendArray = selectedFriend.friendList.filter((e)=>{if(e!==userContext.user?.id){return e}});
                const updatedFriend : Omit<User,'password'> = {...selectedFriend , friendList : newFriendArray}
                /////////////////// UPDATE IN DB /////////////////
                await updateUserById(updatedFriend);
                await updateUserById(updatedUser);
                endwithease();
            }else{
                setError('He deleted you before you did ;) !')
            }
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
        <div className="PopupWithBlurrOption" onClick={(e)=>{
            e.stopPropagation()
        }}>
            <button style={{border: `3px solid ${selectedFriend?.userColor},gridColumn: "1 / -1", textAlign :"center"`}}
            onClick={()=>deleteHandler()}
            >DELETE {selectedFriend?.userName} !!</button>
            {error && 
             <div className="PopupInside" style={{gridColumn: "1 / -1", textAlign :"center" }}>
             <span  className="error">{error}</span>
             </div>
            }
            <button className="popup-closeOption" 
            style={{gridColumn: "1 / -1", textAlign :"center" }}
            onClick={endwithease}>✕</button>
        </div>
    </div>
    )
}