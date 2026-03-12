import { useEffect, useState, type JSX } from "react";
import { Sidebar } from "../components/layout/Sidebar";
import { DeskDisplay } from "../components/desk/DeskDisplay";

//////// HOME PAGE YOU DON T SAY //////////////
export function HomePage(): JSX.Element {
    const [animation , setAnimation] = useState<string>('hidden');
    useEffect(()=>{
        setAnimation('fadeIn')
    },[])
    return (
        <div className={`globalContainer ${animation}`}>
            <Sidebar />
            <DeskDisplay />
        </div>
    )
}