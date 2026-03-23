import { useEffect, useState, type JSX } from "react";

export function MessageDisplay({message, clock = 2000,triggerKey} :{message :string | null, clock? : number, triggerKey: number}) : JSX.Element{
    const [visible, setVisible] = useState(true);
    useEffect(()=>{
        setVisible(true);
        if(!message) return;
            const timer = setTimeout(()=>{
                setVisible(false);
        },clock)
        return ()=> clearTimeout(timer);
    },[triggerKey]);
    if(!message || !visible){
        return (<></>)
    }
    return(
       <>
            {message && 
                <div className={visible ? `fadeIn tutorialMessageText` : 'fadeOut' } style={{gridColumn: "1 / -1", display : "flex", maxWidth : "100%" }}>
                  {message}   
                </div>
            }
       </>
   )
}