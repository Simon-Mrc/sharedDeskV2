import { createContext, useContext, useRef, useState, type ReactNode } from "react";
import {type  ModalTypes, type ModalContextType, type ConfirmOptions } from "../../shared/types";

export const ModalContext = createContext<ModalContextType|null>(null);

export function ModalProvider ({children} : {children : ReactNode}){
    const [type , setType] = useState<(ModalTypes|null)[]>([]);
    const [data, setData] = useState <any | ConfirmOptions>(null);
    const [dataRecord, setDataRecord] = useState<any[]>([]);
    const [typeRecord, setTypeRecord] = useState<(typeof type)[]>([[]]);

    function openModal(currenType : ModalTypes, data : any = null){
        const newTypeRecord = [...type,currenType];
        setType(prev => [...prev  ,currenType]);
        setTypeRecord(prev => [...prev,newTypeRecord]);
        setData(data);
        setDataRecord(dataRecord => [...dataRecord, data]);
    }

    function closeModal(){
        setType([]);
        setTypeRecord([]);
        setData(null);
        setDataRecord([]);
    }

    function prevModal(){
        if(typeRecord.length < 2) closeModal();
        const safeType = typeRecord[typeRecord.length-2];
        const safeData = dataRecord[dataRecord.length-2];
        setType(safeType);
        setData(safeData);
        setTypeRecord(prev => prev.slice(0,-1));
        setDataRecord(prev => prev.slice(0,-1));
    }

    const resolveConfirmRef = useRef<((value : boolean)=>void |null)>(null)
    
    function confirm(option : ConfirmOptions) : Promise<boolean>{
        return new Promise<boolean>((resolve) => {
            resolveConfirmRef.current = resolve;
            openModal('confirm', option)         
        })
    }

    function resolveConfirm(value : boolean){
        resolveConfirmRef.current?.(value)
        resolveConfirmRef.current = null;
        prevModal();
    }   

    return(
        <ModalContext.Provider value = {{type,data,openModal,closeModal,prevModal,confirm,resolveConfirm}}>
            {children}
        </ModalContext.Provider>
    )

}

export function useModal(){
    const context = useContext(ModalContext);
    if(!context) throw new Error('useModal must be used inside ModalProvider');
    return context;
}