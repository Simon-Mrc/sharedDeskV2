import { createContext, useContext, useState, type ReactNode } from "react";
import {type  ModalTypes, type ModalContextType } from "../../shared/types";

export const ModalContext = createContext<ModalContextType|null>(null);

export function ModalProvider ({children} : {children : ReactNode}){
    const [type , setType] = useState<ModalTypes>(null);
    const [data, setData] = useState <any>(null);

    function openModal(type : ModalTypes, data = null){
    setType(type);
    setData(data);
    }

    function closeModal(){
    setType(null);
    setData(null);
    }

    return(
        <ModalContext.Provider value = {{type, data, openModal,closeModal}}>
            {children}
        </ModalContext.Provider>
    )
}

export function useModal(){
    const context = useContext(ModalContext);
    if(!context) throw new Error('useModal must be used inside ModalProvider');
    return context;
}