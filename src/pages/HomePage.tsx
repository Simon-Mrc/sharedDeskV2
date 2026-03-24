import { useContext, useEffect, useState, type JSX } from "react";
import { Sidebar } from "../components/layout/Sidebar";
import { DeskDisplay } from "../components/desk/DeskDisplay";
import { UserContext } from "../context/UserContext";
import { TutorialContext } from "../context/TutorialContext";
import { DeskContext } from "../context/DeskContext";

//////// HOME PAGE YOU DON T SAY //////////////
export function HomePage(): JSX.Element {
    const [animation , setAnimation] = useState<string>('hidden');
    const userContext = useContext(UserContext);
    const tutorialContext = useContext(TutorialContext);
    const [messagePosition, setMessagePosition] = useState<'center'|'top'|'hidden'>('hidden');
    const deskContext = useContext(DeskContext)

    useEffect(()=>{
        if(userContext?.logged){
            setAnimation('fadeIn')
        }else{
            setAnimation('fadeOut')
        }
    },[userContext?.logged])

    useEffect(()=>{
        if(userContext?.user && deskContext?.desks?.length===0){
            tutorialContext?.startTutorial();
        }
    },[userContext?.user?.id])

    useEffect(()=>{
        if(!tutorialContext?.isActive) return
        setMessagePosition('hidden')
        const centerTimer = setTimeout(()=>{
            setMessagePosition('center')
        }, 1); 
        const topTimer = setTimeout(()=>{
            setMessagePosition('top')
        }, 2500);
        return ()=>{
            clearTimeout(centerTimer)
            clearTimeout(topTimer)
        }
    },[tutorialContext?.message])

    return (
        <div className={`globalContainer ${animation} ${tutorialContext?.isActive ? 'tutorialActive' : ''}`}>
            {tutorialContext?.isActive && (
                <>
                    {/* global blur overlay */}
                    <div className="tutorialOverlay"/>
    
                    {/* floating message */}
                    <div className={`tutorialMessage ${messagePosition}`} key={tutorialContext.step}>
                        <p className="tutorialMessageText">{tutorialContext.message}</p>
                        {tutorialContext.subMessage && 
                            <p className="tutorialSubMessage">{tutorialContext.subMessage}</p>
                        }
                        <button 
                            className="tutorialSkip" 
                            onClick={()=> tutorialContext.skipTutorial()}>
                            skip tutorial
                        </button>
                        <p className="tutorialStepIndicator">
                            {tutorialContext.step + 1} / {35}
                        </p>
                    </div>
                </>
            )}
            <Sidebar />
            <DeskDisplay />
        </div>
    )
}