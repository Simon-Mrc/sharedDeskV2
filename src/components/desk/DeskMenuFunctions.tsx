import { useContext, useEffect, useState, type JSX } from "react";
import type { Desk, User } from "../../../shared/types";
import { UserContext } from "../../context/UserContext";
import { getUserById } from "../../api/user";
import { inviteToDesk } from "../../api/deskAccess";
import { DeskContext } from "../../context/DeskContext";

//////////////////////////////////////////////////////////////////////////////////////////
////////////////// ALL JSX FUNCTION FOR DESKS FUNCTIONS HERE ! //////////////////
//////////////////////////////////////////////////////////////////////////////////////////

/////////////////////////// INVITE MENU PART /////////////////////////////////
export function InviteMenu({onClose,selectedDesk} : {onClose : ()=>void, selectedDesk : Desk|null}) : JSX.Element{
    const [friendMenu , setFriendMenu] = useState<boolean>(false);
    const [selectedFriend , setSelectedFriend] = useState<Omit<User,'password'>|null>(null);
    const[friendArray ,setFriendArray] = useState<(Omit<User,'password'>|null)[]>([]);
    const [error,setError] = useState<string>('');
    const userContext = useContext(UserContext);

    
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
            {friendArray.map((friend)=>(
                <button style={{border: `1.5px solid ${friend?.userColor}`}}
                 onClick={()=>{
                    setFriendMenu(true);
                    setSelectedFriend(friend)
                }}>{friend?.userName}</button>
            ))}
            {friendMenu&&
            <FriendMenu
            onClose = {()=>setFriendMenu(false)}
            selectedFriend={selectedFriend}
            selectedDesk = {selectedDesk}
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

//////////////////// FRIEND MENU PART FOLLOWING INVITE MENU ////////////////////////
export function FriendMenu({onClose , selectedFriend, selectedDesk} : {onClose: ()=>void , selectedFriend : Omit<User,'password'>|null, selectedDesk : Desk|null}) : JSX.Element{
    const [error , setError] = useState<string>('');
    const deskContext = useContext(DeskContext);

    async function inviteHandler(){
        if(selectedDesk && selectedFriend){
            const messageFromDb = await inviteToDesk(selectedFriend?.id,selectedDesk?.id);
            setError(messageFromDb.message);
            deskContext?.refreshDesks();
            setTimeout(()=>{
                setAnimation('fadeOut')
                setTimeout((()=>{
                    onClose()}),500)
                },1500)
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
            <h2 className="popup-title"> Invite {selectedFriend?.userName} to {selectedDesk?.name} ?</h2>
            <button onClick={()=>endwithease()}>NEVER</button>
            <button onClick={()=>inviteHandler()}>YEAH</button>
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
