import { useContext, useEffect, useState, type JSX } from "react";
import { Sidebar } from "../components/layout/Sidebar";
import { DeskDisplay } from "../components/desk/DeskDisplay";
import { UserContext } from "../context/UserContext";

//////// HOME PAGE YOU DON T SAY //////////////
export function HomePage(): JSX.Element {
    const [animation , setAnimation] = useState<string>('hidden');
    const userContext = useContext(UserContext);
    useEffect(()=>{
        if(userContext?.logged){
            setAnimation('fadeIn')
        }else{
            setAnimation('fadeOut')
        }
    },[userContext?.logged])
    return (
        <div className={`globalContainer ${animation}`}>
            <Sidebar />
            <DeskDisplay />
        </div>
    )
}