import { useContext, useState, type JSX } from "react";
import type { User } from "../../../shared/types";
import { getUserBySearch } from "../../api/user";
import { SearchFriend, Invit, FriendList } from "./SocialMenuComponents";
import { UserContext } from "../../context/UserContext";

/////////////////////////////// SOCIAL MENU PURE JSX FUNCTION ////////////////////////////////
//////////// ROOT FOR ALL SOCIAL FEATURES ///////// HANDLES THE STATES OF PROMPTS////////////////
export function SocialMenu({onClose} : {onClose : ()=>void}):JSX.Element{
    let isConfirmHighlighted =false;
    const userContext = useContext(UserContext);
    isConfirmHighlighted = (userContext?.user?.notif.length !==0);
    const [searchFriend, setSearchFriend] = useState<boolean>(false);
    const [friendList, setFriendList] = useState<boolean>(false);
    const [invit , setInvit] = useState<boolean>(false);
    const [search , setSearch] = useState<string>('');
    const [arrayOfFriends , setArrayOffFriends] = useState<Omit<User,'password'>[]|null>(null);
    async function searchHandler(){
        const arrayOfFriend = await getUserBySearch(search);
        setArrayOffFriends(arrayOfFriend);
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
                    <div style={{gridColumn: "1 / -1", display : "flex", maxWidth : "100%" }}>
                    <input className="ModernInput"
                    onChange={(input)=>setSearch(input.target.value)}
                    placeholder='Enter your friend Name or userName' />
                    <button  style={{maxWidth :"20%"}}
                    onClick={()=>{
                    searchHandler();
                    setSearchFriend(true)}} 
                    > 🔍</button>
                    {searchFriend &&
                    <SearchFriend 
                    onClose = {()=> setSearchFriend(false)}
                    arrayOfFriends = {arrayOfFriends}
                    />}
                    </div>

                    <button className={isConfirmHighlighted ? 'tutorialHighlight' : ''}
                    onClick={()=> setFriendList(true)} >Show FriendList</button>
                    {friendList &&
                    <FriendList 
                    onClose = {()=> setFriendList(false)} 
                    />}
                    <button onClick={()=> setInvit(true)}>Show Invits{userContext?.user?.notif.length!=0 && ('🔔')}</button>
                    {invit &&
                    <Invit 
                    onClose = {()=> setInvit(false)}
                     />}
                    <button className="popup-closeOption" 
                    style={{gridColumn: "1 / -1", textAlign :"center" }}
                    onClick={endwithease}>✕</button>
                </div>
            </div>
        )
}