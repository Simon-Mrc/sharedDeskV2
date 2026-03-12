import { useState, type JSX } from "react";
import type { User } from "../../../shared/types";
import { getUserBySearch } from "../../api/user";
import { SearchFriend, Invit, FriendList } from "./SocialMenuComponents";

/////////////////////////////// SOCIAL MENU PURE JSX FUNCTION ////////////////////////////////
//////////// ROOT FOR ALL SOCIAL FEATURES ///////// HANDLES THE STATES OF PROMPTS////////////////
export function SocialMenu({onClose} : {onClose : ()=>void}):JSX.Element{
    const [searchFriend, setSearchFriend] = useState<boolean>(false);
    const [friendList, setFriendList] = useState<boolean>(false);
    const [invit , setInvit] = useState<boolean>(false);
    const [search , setSearch] = useState<string>('');
    const [arrayOfFriends , setArrayOffFriends] = useState<Omit<User,'password'>[]|null>(null);
    async function searchHandler(){
        const arrayOfFriend = await getUserBySearch(search);
        setArrayOffFriends(arrayOfFriend);
        console.log(arrayOfFriend);
    }

    return(
            <div className="overlay" onClick={()=>onClose()}>
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

                    <button onClick={()=> setFriendList(true)} >Show FriendList</button>
                    {friendList &&
                    <FriendList 
                    onClose = {()=> setFriendList(false)} 
                    />}
                    <button onClick={()=> setInvit(true)}>Show Invits</button>
                    {invit &&
                    <Invit 
                    onClose = {()=> setInvit(false)}
                     />}
                    <button className="popup-closeOption" 
                    style={{gridColumn: "1 / -1", textAlign :"center" }}
                    onClick={onClose}>✕</button>
                </div>
            </div>
        )
}