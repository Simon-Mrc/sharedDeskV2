import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import type { SectionContextType } from "../../shared/types";
import { DeskContext } from "./DeskContext";

export const SectionContext = createContext<SectionContextType|null>(null);

///////////////////////////// SECTION CONTEXT PROVIDER //////////////////////////
export function SectionProvider({children} : {children : ReactNode}){
    const [currentSection , setCurrentSection] = useState<SectionContextType['currentSection']>(null);
    const [sectionExist , setSectionExists] = useState<boolean>(false);
    const [depth , setDepth] = useState<number>(0);
    const [count, setCount] = useState<number>(0);
    const deskContext = useContext(DeskContext);
    useEffect(()=>{
        setCurrentSection(null);
        setSectionExists(false);
        setDepth(0);
    },[deskContext?.currentDesk])
    function updateDepth(number : number){
        setDepth(number)
    }
    function switchSection (sectionId : string|null){
        setCurrentSection(sectionId);
        setSectionExists(true);
        setCount(prev => prev + 1);
    }
    return(
        <SectionContext.Provider value = {{currentSection,depth,count,updateDepth,sectionExist,switchSection}}>
            {children}
        </SectionContext.Provider>
    )
}