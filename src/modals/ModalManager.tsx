import { LoginPrompt } from "../components/prompts/LoginPrompt";
import { SocialMenu } from "../components/social/SocialMenu";
import { useModal } from "../context/ModalContext";

export function ModalManager(){
    const {type} = useModal();

    if(!type) return null;
    return(
        <>
            {type === 'login' && <LoginPrompt/>}
            {/* {type === 'register' && <RegsiterPrompt/>}
            {type === 'social' && <SocialMenu/>} */}
        </>
    )
}