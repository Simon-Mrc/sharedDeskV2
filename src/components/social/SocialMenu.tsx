import { useContext, useState, type JSX } from "react";
import type { User } from "../../../shared/types";
import { getUserBySearch } from "../../api/user";
import { UserContext } from "../../context/UserContext";
import { useModal } from "../../context/ModalContext";
import { MenuContainer } from "../../modals/Modal";

/////////////////////////////// SOCIAL MENU PURE JSX FUNCTION ////////////////////////////////
//////////// ROOT FOR ALL SOCIAL FEATURES ///////// HANDLES THE STATES OF PROMPTS////////////////
export function SocialMenu():JSX.Element{
    const {prevModal, openModal} = useModal()
    let isConfirmHighlighted =false;
    const userContext = useContext(UserContext);
    isConfirmHighlighted = (userContext?.user?.notif.length !==0);
    const [search , setSearch] = useState<string>('');
    const [arrayOfFriends , setArrayOffFriends] = useState<Omit<User,'password'>[]|null>(null);
    async function searchHandler(){
        const newArrayOfFriend = await getUserBySearch(search);
        setArrayOffFriends(newArrayOfFriend);
        return newArrayOfFriend;
    }


    ////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////
  
    return(
        <>
            <MenuContainer onClose={prevModal}>
                <div style={{gridColumn: "1 / -1", display : "flex", maxWidth : "100%" }}>
                    <input className="ModernInput"
                        onChange={(input)=>setSearch(input.target.value)}
                        placeholder='Enter your friend Name or userName' />
                    <button  style={{maxWidth :"20%"}}
                    onClick={async ()=>{
                        const newArrayOfFriend = await searchHandler();
                        openModal('searchFriendSocial', newArrayOfFriend);
                    }} 
                    > 🔍</button>
                </div>

                    <button 
                        onClick={()=> openModal('showFriendListSocial')} >Show FriendList
                    </button>
                    <button 
                    className={isConfirmHighlighted ? 'tutorialHighlight' : ''}
                    onClick={()=> openModal('showInvitSocial')}
                        >Show Invits{userContext?.user?.notif.length!=0 && ('🔔')}
                    </button>
            </MenuContainer>
        </>
        )
}