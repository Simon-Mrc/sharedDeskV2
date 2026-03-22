import { useEffect, useState } from "react";

export function useCloseAnimation (onClose : ()=>void ,timer = 500){
    ///////////////////////////////////////////////////////////////////////
        /////////////////////// ANIMATION HANDLER PART TO BE REUSED ////////////////
        ////////////////////////////////////////////////////////////////////
        const [animation , setAnimation] = useState<string>('');
        function endWithEase(){
                setAnimation('fadeOut');
            }
        useEffect(()=>{
            if(animation === 'fadeOut'){
                const clock =setTimeout(()=>{
                    setAnimation('');
                    onClose();
                },timer)
                return ()=> clearTimeout(clock);
            }
        },[animation, onClose, timer])
        return {animation , endWithEase}
}

export function useOpenAnimation (timer = 500){
    ///////////////////////////////////////////////////////////////////////
        /////////////////////// ANIMATION HANDLER PART TO BE REUSED ////////////////
        ////////////////////////////////////////////////////////////////////
        const [animation , setAnimation] = useState<string>('');
        function openWithEase(){
                setAnimation('fadeIn');
            }
        useEffect(()=>{
            if(animation === 'fadeIn'){
                const clock = setTimeout(()=>{
                    setAnimation('');
                },timer)
                return ()=> clearTimeout(clock)
            }
        },[animation,timer])
        return {animation , openWithEase}
}