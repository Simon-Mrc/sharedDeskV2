import { useCallback, useState } from "react";

export function useMessage(){
    const [message, setMessage] = useState<string|null>(null);
    const [triggerKey, setTriggerKey] = useState<number>(0);

    const showMessage = useCallback((msg:string)=>{
        setMessage(msg);
        setTriggerKey(prev => prev+1);
    }, []);

    return {message,triggerKey,showMessage}
}