import { useContext, useEffect, useState, type JSX } from "react";
import type { User } from "../../../shared/types";
import { UserContext } from "../../context/UserContext";
import { getUserById, updateUserById } from "../../api/user";

////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////// SEARCH FRIEND AND SEND INVITE PART ////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////
export function SearchFriend({onClose , arrayOfFriends} : {onClose : ()=>void , arrayOfFriends : Omit<User,'password'>[]|null}): JSX.Element{
    const [inviteMenu , setInviteMenu] = useState<boolean>(false);
    const [currentFriend , setCurrentFriend] = useState<Omit<User,'password'>|null>(null);
    
    return(
        <div className="overlay" onClick={()=>onClose()}>
            <div className="PopupWithBlurrOption" onClick={(e)=>e.stopPropagation()}>
                {arrayOfFriends?.map((user)=>(
                    <div key= {user.id}>
                        <button style={{border: `3px solid ${user.userColor}`}}
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
                onClick={onClose}>✕</button>
            </div>
        </div>
    )
}

export function InviteMenu({onClose,currentFriend} : {onClose : ()=>void, currentFriend : Omit<User,'password'>|null}) : JSX.Element{
    const userContext = useContext(UserContext);
    const [error , setError] = useState<string>('');
    async function inviteHandler(){
        if(userContext?.user && currentFriend){
            console.log(currentFriend?.notif.includes(userContext?.user?.id))
            console.log(currentFriend?.friendList?.includes(userContext?.user?.id))
            console.log(currentFriend?.friendList)
            console.log(userContext?.user?.id)
            if(currentFriend?.notif.includes(userContext?.user?.id) || currentFriend?.friendList?.includes(userContext?.user?.id)){
                setError('He is already your friend or you already send an invite');
                console.log('error')
            }else{
                const newArray = [...currentFriend.notif,userContext.user.id];
                currentFriend.notif = newArray;
                await updateUserById(currentFriend);
                onClose();
            }
        }
    }
    return(
        <div className="overlay" onClick={()=>onClose()}>
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
                onClick={onClose}>✕</button>
            </div>
        </div>
    )
}

////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////// SHOW NOTIFS AND ACCEPT FRIEND PART  ////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////
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

    return(
        <div className="overlay" onClick={()=>onClose()}>
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
                onClick={onClose}>✕</button>
            </div>
        </div>

    )
}

export function AcceptOrNot ({onClose,selectedUser} : {onClose : ()=>void , selectedUser : Omit<User,'password'>|null}) : JSX.Element{
    const[response , setResponse] = useState<boolean>(false);
    const userContext = useContext(UserContext);
    const currentUser = userContext?.user;
    const [error,setError] = useState<string>('');

    async function acceptHandler(accepted : boolean){

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
    return(
    <div className="overlay" onClick={()=>onClose()}>
        <div className="PopupWithBlurrOption" onClick={(e)=>{
            e.stopPropagation()
        }}>
            <button style={{border: `3px solid #02a32b`}}
                    onClick={async()=>{
                        await acceptHandler(true);
                        onClose()
                    }
                    }>{`Accept ${selectedUser?.userName} as a friend`}</button>
            <button style={{border: `3px solid #a33002`}}
                    onClick={async ()=>{
                        await acceptHandler(false);
                        onClose();
                    }
                    }>{`Refuse ${selectedUser?.userName} as a friend`}</button>
            
            {error && 
             <div className="PopupInside" style={{gridColumn: "1 / -1", textAlign :"center" }}>
             <span  className="error">{error}</span>
             </div>
            }
            <button className="popup-closeOption" 
            style={{gridColumn: "1 / -1", textAlign :"center" }}
            onClick={onClose}>✕</button>
        </div>
    </div>
    )
}
////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////// SHOW FRIEND LIST AND OPEN FRIEND MENU PART ////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////