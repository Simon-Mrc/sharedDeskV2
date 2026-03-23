import { useContext, useEffect, useState, type JSX } from "react";
import type { User } from "../../../shared/types";
import { UserContext } from "../../context/UserContext";
import { getUserById, updateUserById } from "../../api/user";
import { useModal } from "../../context/ModalContext";
import { MenuContainer } from "../../modals/Modal";
import { ErrorDisplay } from "../ui/ErrorDisplay";


////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////// SEARCH FRIEND AND SEND INVITE PART ////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////

///////////////////////////////// SEARCH FRIEND PART ///////////////////////////////////
export function SearchFriendSocial(): JSX.Element{
    const {openModal, data } = useModal();
    const userContext = useContext(UserContext);
    
    return(
        <>
            <MenuContainer onClose={()=>openModal('socialMenu')}>
                {data?.map((user :  Omit<User,'password'>)=>!userContext?.user?.friendList.includes(user.id) && (
                    <div key= {user.id}>
                        <button style={{border: `1.5px solid ${user.userColor}`}}
                        onClick={()=>{
                            openModal('inviteFriendSocial', user)
                        }
                        }>{user.userName}</button>
                    </div>
                ))}
            </MenuContainer>
        </>
    )
}

///////////////////////////////// SEND INVITE PART ///////////////////////////////////
export function InviteFriendSocial() : JSX.Element{
    const {openModal,data} = useModal();
    const userContext = useContext(UserContext);
    const [error , setError] = useState<string>('');
    
    async function inviteHandler(){
        if(userContext?.user && data){
            if(data?.notif.includes(userContext?.user?.id) || data?.friendList?.includes(userContext?.user?.id)){
                setError('He is already your friend or you already send an invite');
                setTimeout(()=>{
                    setError('');
                },1500)

            }else{
                const newArray = [...data.notif,userContext.user.id];
                data.notif = newArray;
                await updateUserById(data);
                setError('Invite sent =D');
                setTimeout(()=>{
                    openModal('socialMenu');
                },1500)
            }
        }
    }

    ////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////
  
    return(
        <>
            <MenuContainer onClose={()=> openModal('socialMenu')}>
                <button style={{gridColumn: "1 / -1", textAlign :"center" ,border: `3px solid ${data?.userColor}`}}
                onClick={()=>inviteHandler()}
                >{`you wish to invite ${data?.userName}?`}</button>
                <ErrorDisplay error={error}/>
            </MenuContainer>
        </>
    )
}

////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////// SHOW NOTIFS AND ACCEPT FRIEND PART  ////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////

///////////////////////////////////////// SHOW NOTIF PART /////////////////////////////////////
export function ShowInvitSocial() : JSX.Element{
    const {openModal} = useModal()
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
    },[userContext?.user?.notif.length]) 
    const [error,setError] = useState<string>('');


    ////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////
  
    return(
        <>
            <MenuContainer onClose={()=>openModal('socialMenu')}>
                {arrayOfFriend?.map((friend)=> (friend&&
                    <button style={{border: `3px solid ${friend.userColor}`}}
                    onClick={()=>{
                        openModal('acceptOrNotSocial',friend)
                    }
                    }>{friend?.userName}</button>
                ))}
                <ErrorDisplay error={error}/>
            </MenuContainer>
        </>

    )
}
 /////////////////////////////// ACCEPT OR NOT PART /////////////////////////////////////
export function AcceptOrNotSocial () : JSX.Element{
    const {openModal,data} = useModal();
    const userContext = useContext(UserContext);
    const currentUser = userContext?.user;
    const [error,setError] = useState<string>('');

    async function acceptHandler(accepted : boolean){ // boolean as a param because of promise fetch 

            if(data && currentUser){
                if(currentUser.friendList.includes(data.id)){
                    setError('He is already your friend and god know why!');
                    const newNotif = currentUser.notif.filter((u)=> {if(u!==data.id){return u}})
                    currentUser.notif = newNotif;
    //////////////////////////////UPDATE IN DB /////////////////////////////////
                    await updateUserById(currentUser);  
                    userContext.setNewUser(currentUser);
                    return;
                }
                if(accepted){
                    currentUser.friendList.push(data.id);
                    data.friendList.push(currentUser.id);
                    const newNotif = currentUser.notif.filter((u)=> {if(u!==data.id){return u}})
                    // const newNotif = currentUser.friendList.filter((u) => u !== selectedUser.id);
                    currentUser.notif = newNotif;
    //////////////////////////////UPDATE IN DB /////////////////////////////////
                    await updateUserById(currentUser);
                    userContext.setNewUser(currentUser);
                    await updateUserById(data);
                }else{
                    const newNotif = currentUser.friendList.filter((u)=> {if(u!==data.id){return u}})
                    currentUser.notif = newNotif;
    //////////////////////////////UPDATE IN DB /////////////////////////////////
                    await updateUserById(currentUser);  
                    userContext.setNewUser(currentUser);
                }    
            }
    }

    
    ////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////
  
    return(
    <>
        <MenuContainer onClose={()=>openModal('socialMenu')}>
            <button style={{border: `3px solid #02a32b`}}
                onClick={async()=>{
                    await acceptHandler(true);
                    openModal('socialMenu')
                }
                }>{`Accept ${data?.userName} as a friend`}</button>
            <button style={{border: `3px solid #a33002`}}
                onClick={async ()=>{
                    await acceptHandler(false);
                    openModal('socialMenu');
                }
                }>{`Refuse ${data?.userName} as a friend`}</button>   
            <ErrorDisplay error={error}/>
        </MenuContainer>
    </>
    )
}
////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////// SHOW FRIEND LIST AND OPEN FRIEND MENU PART ////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////

///////////////////////////////////// SHOW ALL FRIENDS PART ////////////////////////////
export function ShowFriendListSocial() : JSX.Element{
    const {openModal} = useModal();
    const userContext = useContext(UserContext);
    const [error, setError] = useState<string>("");
    const [arrayOfFriend , setArrayOffFriends] = useState<(Omit<User , 'password'>|null)[]>([]);
    
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

/////////////////////////////////JSX PART //////////////////////////////
    return(
    <>
        <MenuContainer onClose={()=>openModal('socialMenu')}>
            {arrayOfFriend.map((user)=>(
                <button style={{border: `3px solid ${user?.userColor}`}}
                onClick={()=>{
                    openModal('friendMenuSocial',user);
                }}>{user?.userName}</button>
            ))}
            <ErrorDisplay error={error}/>
        </MenuContainer>
    </>
    )
}

/////////////////////////////////////// SHOW FRIEND MENU PART //////////////////////////
export function FriendMenuSocial() : JSX.Element{
    const {openModal,data} = useModal();
    const userContext = useContext(UserContext);
    const [error, setError] = useState<string>('');
    async function deleteHandler(){
        if(data){
            if(userContext?.user?.friendList.includes(data?.id)){
                //////////// MODIFY FRIENDLISTS //////////////////
                const newUserArray = userContext.user.friendList.filter((e)=>{if(e!==data.id){return e}});
                const updatedUser : Omit<User,'password'> = {...userContext.user, friendList : newUserArray}
                userContext.setNewUser(updatedUser);
                const newFriendArray = data.friendList.filter((e : string)=>{if(e!==userContext.user?.id){return e}});
                const updatedFriend : Omit<User,'password'> = {...data , friendList : newFriendArray}
                /////////////////// UPDATE IN DB /////////////////
                await updateUserById(updatedFriend);
                await updateUserById(updatedUser);
                openModal('socialMenu');
            }else{
                setError('He deleted you before you did ;) !')
            }
        }
    }

    ////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////
  
    return(
    <>
        <MenuContainer onClose={()=>openModal('socialMenu')}>
            <button style={{border: `3px solid ${data?.userColor},gridColumn: "1 / -1", textAlign :"center"`}}
            onClick={()=>deleteHandler()}
            >DELETE {data?.userName} !!</button>
            <ErrorDisplay error={error}/>
        </MenuContainer>
    </>
    )
}