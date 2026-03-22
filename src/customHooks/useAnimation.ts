import { useEffect, useState } from "react";

//////////////////////////////////////////////////////////////////////
///////////////// CLOSE FADEOUT ANIMATION ////////////////
////////////////////////////////////////////////////////////////////
export function useCloseAnimation (onClose : ()=>void ,timer = 500){
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

//////////////////////////////////////////////////////////////////////
///////////////// OPEN FADE IN ANIMATION ////////////////
////////////////////////////////////////////////////////////////////
export function useOpenAnimation (timer = 500){
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

//////////////////////////////////////////////////////////////////////
///////////////// ERROR RED SHAKE ANIMATION + ERROR MESSAGE  ////////////////
////////////////////////////////////////////////////////////////////
export function useInputErrorAnimation(time = 500){
    const [error,setError] = useState<string|null>(null);
    const [inputAnimation , setInputAnimation] = useState<string>('');
    function triggerAnimation(text = ''){
        setError(text);
        setInputAnimation('shake');
        setTimeout(()=>{
            setInputAnimation('');
        },time)
    }
    return {error, inputAnimation,triggerAnimation} 
}