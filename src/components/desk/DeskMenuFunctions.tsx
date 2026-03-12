import { useContext, useEffect, useState, type JSX } from "react";
import type { User } from "../../../shared/types";
import { UserContext } from "../../context/UserContext";
import { getUserById } from "../../api/user";

//////////////////////////////////////////////////////////////////////////////////////////
////////////////// ALL JSX FUNCTION FOR DESKS FUNCTIONS HERE ! //////////////////
//////////////////////////////////////////////////////////////////////////////////////////

//////////////!!!!!!!!!!!!!!!!!! ABSOLUTENOTFORGET !!!!!!!!!!!/////////////////

/////////////////////////// INVITE MENU PART /////////////////////////////////
export function InviteMenu({onClose} : {onClose : ()=>void}) : JSX.Element{
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

    return(
    <div className="overlay" onClick={()=>onClose()}>
        <div className={`PopupWithBlurrOption`} onClick={(e)=>e.stopPropagation()}>
            {friendArray.map((friend)=>(
                <button style={{border: `1.5px solid ${friend?.userColor}`}}
                 onClick={()=>{
                    setFriendMenu(true);
                    setSelectedFriend(friend)
                }}>{friend?.userName}</button>
            ))}
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

//////////////////// FRIEND MENU PART FOLLOWING INVITE MENU ////////////////////////

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
