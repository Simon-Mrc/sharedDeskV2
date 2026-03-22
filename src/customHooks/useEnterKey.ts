import { useEffect } from "react";

export function useEnterKey(desiredFunction : ()=>void):void{
    useEffect(()=>{
        const handleEnter = (event : KeyboardEvent)=>{
            if(event.key ==='Enter'){desiredFunction()}
        }
        window.addEventListener('keydown', handleEnter);
        return ()=> window.removeEventListener('keydown',handleEnter);
    },[desiredFunction])
}