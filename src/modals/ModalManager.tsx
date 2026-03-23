import { DeskMenu } from "../components/desk/DeskMenu";
import { DeskFriendMenu, DeskInviteMenu } from "../components/desk/DeskMenuFunctions";
import { CreateItemPrompt } from "../components/prompts/CreateItemPrompt";
import { LoginPrompt } from "../components/prompts/LoginPrompt";
import { RegisterPrompt } from "../components/prompts/RegisterPrompt";
import { SocialMenu } from "../components/social/SocialMenu";
import { useModal } from "../context/ModalContext";
import { CreateFilePrompt } from "../components/prompts/CreateFilePrompt";
import { CreateDeskPrompt } from "../components/prompts/creatingDeskPrompt";
import { ItemDeletePrompt, ItemNamePrompt, ItemPasswordPrompt } from "../components/prompts/OptionPrompts";
import { AcceptOrNotSocial, FriendMenuSocial, InviteFriendSocial, SearchFriendSocial, ShowFriendListSocial, ShowInvitSocial } from "../components/social/SocialMenuComponents";

export function ModalManager(){
    const {type} = useModal();
    
    if(!type) return null;
    return(
        <>
                {/* LOGIN PAGE PART */}
            {type === 'login' && <LoginPrompt/>}
            {type === 'register' && <RegisterPrompt/>}
                {/* SIDEBAR PART  */}
            {type === 'createDeskMenu' && <CreateDeskPrompt/>}
            {type === 'deskMenu' && <DeskMenu/>}
            {type === 'deskInviteMenu' && <DeskInviteMenu/>}
            {type === 'deskFriendMenu' && <DeskFriendMenu/>}
                {/* DESK DISPLAY PART  */}
            {type === 'createItemPrompt' && <CreateItemPrompt/>}
            {type === 'createFilePrompt' && <CreateFilePrompt/>}
                {/* OPTION MENU FOR ITEM */}
            {type === 'itemNamePrompt' && <ItemNamePrompt/>}
            {type === 'itemPasswordPrompt' && <ItemPasswordPrompt/>}
            {type === 'itemDeletePrompt' && <ItemDeletePrompt/>}
                {/* SOCIAL PART */}
            {type === 'socialMenu' && <SocialMenu/>}
            {type === 'searchFriendSocial' && <SearchFriendSocial/>}
            {type === 'inviteFriendSocial' && <InviteFriendSocial/>}
            {type === 'showInvitSocial' && <ShowInvitSocial/>}
            {type === 'acceptOrNotSocial' && <AcceptOrNotSocial/>}
            {type === 'showFriendListSocial' && <ShowFriendListSocial/>}
            {type === 'friendMenuSocial' && <FriendMenuSocial/>}

        </>
    )
}