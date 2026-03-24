import { useContext, useEffect, useState, type JSX } from "react";
import type { Desk, User } from "../../../shared/types";
import { UserContext } from "../../context/UserContext";
import { getUserById } from "../../api/user";
import { inviteToDesk } from "../../api/deskAccess";
import { DeskContext } from "../../context/DeskContext";
import { MenuContainer } from "../../modals/Modal";
import { useModal } from "../../context/ModalContext";
import { ErrorDisplay } from "../ui/ErrorDisplay";

//////////////////////////////////////////////////////////////////////////////////////////
////////////////// ALL JSX FUNCTION FOR DESKS FUNCTIONS HERE ! //////////////////
//////////////////////////////////////////////////////////////////////////////////////////

/////////////////////////// INVITE MENU PART /////////////////////////////////
export function DeskInviteMenu() : JSX.Element{
    const[friendArray ,setFriendArray] = useState<(Omit<User,'password'>|null)[]>([]);
    const [error,setError] = useState<string>('');
    const userContext = useContext(UserContext);
    const {data,prevModal,openModal} = useModal()

    function goBack(){
        prevModal()
    }
    
    ///////////// GETTING ALL FRIEND SET IN NEW ARRAY //////////////////
    async function setAllFriends(){
        if(userContext?.user){
            const newArray = await Promise.all(userContext?.user?.friendList.map((friend)=>getUserById(friend)));
            setFriendArray(newArray);
            if(newArray.length === 0){
                setError('Try having some friends first');
            }
        }else{
            setFriendArray([]);
            setError('Try having an account first');
        }      
    }
    ////////////////// USE EFFECT FOR REFRESH ON EVERY FRIEND LIST CHANGES ////////////
    useEffect((()=>{
        setAllFriends();
    }),[userContext?.user?.friendList.length])
    

    ////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////
    return(
    <>
        <MenuContainer onClose={goBack}>
            {friendArray.map((friend)=>(
                <button key={friend?.id} style={{border: `1.5px solid ${friend?.userColor}`}}
                 onClick={()=>{
                    openModal('deskFriendMenu',{selectedFriend : friend ,selectedDesk : data})
                }}>{friend?.userName}</button>
            ))}
            <ErrorDisplay error = {error}/>
        </MenuContainer>
    </>
    )
}

//////////////////// FRIEND MENU PART FOLLOWING INVITE MENU ////////////////////////
export function DeskFriendMenu() : JSX.Element{
    const [error , setError] = useState<string>('');
    const deskContext = useContext(DeskContext);
    const {prevModal,data} = useModal();

    function goBack(){
        prevModal();
    }

    async function inviteHandler(){
        if(data.selectedDesk && data.selectedFriend){
            const messageFromDb = await inviteToDesk(data.selectedFriend?.id,data.selectedDesk?.id);
            setError(messageFromDb.message);
            deskContext?.refreshDesks();
            goBack()
        }
    }

    return(
       <>
        <MenuContainer onClose={()=>goBack()}>
            <h2 className="popup-title"> Invite {data.selectedFriend?.userName} to {data.selectedDesk?.name} ?</h2>
            <button onClick={()=>goBack()}>NEVER</button>
            <button onClick={()=>inviteHandler()}>YEAH</button>
            <ErrorDisplay error = {error}/>
         </MenuContainer>
    </> 
    )
}


////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////// QUIT DESK PART  ////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////


////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////// GIVE DESK  PART  ////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////


////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////// DELETE DESK PART  ////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////// SHERCH USER FOR INVIT PART  ////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////
