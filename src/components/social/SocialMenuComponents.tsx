import { useContext, useState, type JSX } from "react";
import type { User } from "../../../shared/types";
import { UserContext } from "../../context/UserContext";
import { updateUserById } from "../../api/user";

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
                        <button onClick={()=>{
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
                <button style={{gridColumn: "1 / -1", textAlign :"center" }}
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

////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////// SHOW FRIEND LIST AND OPEN FRIEND MENU PART ////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////