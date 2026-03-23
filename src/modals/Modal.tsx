import { useEffect, type JSX, type ReactNode } from "react";
import { useCloseAnimation, useOpenAnimation } from "../customHooks/useAnimation";

export function MenuContainer({onClose  ,children}: {onClose : ()=> void ,children : ReactNode}) : JSX.Element{
    const {animation :animationEnter , openWithEase} = useOpenAnimation();
    const {animation : animationExit , endWithEase} = useCloseAnimation(onClose);
    useEffect(()=>{
        openWithEase();
        const handleKeyDown = (event : KeyboardEvent)=>{
            if(event.key === "Escape") endWithEase()
        }
        window.addEventListener("keydown", handleKeyDown);
        return ()=> window.removeEventListener("keydown",handleKeyDown);
    },[])

    

    return (
        <div className={`overlay ${animationExit} ${animationEnter}`} onClick={endWithEase}>
        <div className="PopupWithBlurr" onClick={(e)=>{e.stopPropagation()}}>
            <button className="popup-close" onClick={endWithEase}>✕</button>
            {children}
        </div>
    </div>
    )
}
