import { useEffect } from "react";
import { DeskMenu } from "../components/desk/DeskMenu";
import { DeskFriendMenu, DeskInviteMenu } from "../components/desk/DeskMenuFunctions";
import { CreateItemPrompt } from "../components/prompts/CreateItemPrompt";
import { LoginPrompt } from "../components/prompts/LoginPrompt";
import { RegisterPrompt } from "../components/prompts/RegisterPrompt";
import { SocialMenu } from "../components/social/SocialMenu";
import { useModal } from "../context/ModalContext";

export function ModalManager(){
    const {type} = useModal();
    
    if(!type) return null;
    return(
        <>
            {type === 'login' && <LoginPrompt/>}
            {type === 'register' && <RegisterPrompt/>}
            {type === 'createItemPrompt' && <CreateItemPrompt/>}
            {type === 'deskMenu' && <DeskMenu/>}
            {type === 'deskInviteMenu' && <DeskInviteMenu/>}
            {type === 'deskFriendMenu' && <DeskFriendMenu/>}
            {/* {type === 'social' && <SocialMenu/>} */}
        </>
    )
}