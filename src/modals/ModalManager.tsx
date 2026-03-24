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
import { ConfirmModal } from "../components/prompts/ConfirmPrompt";
import { AccountSettingMenu } from "../components/layout/AccountPart";
import { AvatarMenu } from "../components/userAndAccount/AccountFunctions";

export function ModalManager(){
    const {type} = useModal();
    
    if(!type) return null;
    return(
        <>
                {/* LOGIN PAGE PART */}
            {type.includes('login') && <LoginPrompt/>}
            {type.includes('register') && <RegisterPrompt/>}
                {/* SIDEBAR PART  */}
            {type.includes('createDeskMenu') && <CreateDeskPrompt/>}
            {type.includes('deskMenu') && <DeskMenu/>}
            {type.includes('deskInviteMenu') && <DeskInviteMenu/>}
            {type.includes('deskFriendMenu') && <DeskFriendMenu/>}
                {/* DESK DISPLAY PART  */}
            {type.includes('createItemPrompt') && <CreateItemPrompt/>}
            {type.includes('createFilePrompt') && <CreateFilePrompt/>}
                {/* OPTION MENU FOR ITEM */}
            {type.includes('itemNamePrompt') && <ItemNamePrompt/>}
            {type.includes('itemPasswordPrompt') && <ItemPasswordPrompt/>}
            {type.includes('itemDeletePrompt') && <ItemDeletePrompt/>}
                {/* SOCIAL PART */}
            {type.includes('socialMenu') && <SocialMenu/>}
            {type.includes('searchFriendSocial') && <SearchFriendSocial/>}
            {type.includes('inviteFriendSocial') && <InviteFriendSocial/>}
            {type.includes('showInvitSocial') && <ShowInvitSocial/>}
            {type.includes('acceptOrNotSocial') && <AcceptOrNotSocial/>}
            {type.includes('showFriendListSocial') && <ShowFriendListSocial/>}
            {type.includes('friendMenuSocial') && <FriendMenuSocial/>}
                {/* ACCOUNT SETTINGS */}
            {type.includes('accountSettingMenu') && <AccountSettingMenu/>}
            {type.includes('avatarMenu') && <AvatarMenu/>}
                {/* CONFIRM PATTERN */}
            {type.includes('confirm') && <ConfirmModal/>}
        </>
    )
}