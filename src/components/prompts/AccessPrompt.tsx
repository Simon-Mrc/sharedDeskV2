import { useState, type JSX } from "react";
import type { Item } from "../../../shared/types";
import { downloadFile } from "../../api/file";
import { MenuContainer } from "../../modals/Modal";
import { ErrorDisplay } from "../ui/ErrorDisplay";
import { useInputErrorAnimation } from "../../customHooks/useAnimation";

/////////////////////////// PROMPT FOR FOLDER CHECK IF SECURITY ///////////////////////// NOT COMPLICATED NOTHING TO COMMENT ////////////////////////////
export function AccessPromptFolder({onClose , setHasAccess ,switchSection,updateDepth,setOptionMenu, item, check} : 
    {onClose : ()=>void , setHasAccess : ()=>void, switchSection : ()=>void ,updateDepth : ()=>void , setOptionMenu :() => void  , item : Item , check : number}): JSX.Element {
        
        const {error, inputAnimation , triggerAnimation} = useInputErrorAnimation();
        const [password, setPassword] = useState<string>('');
        function accessHandler(){
            if(password === item.accessPassword){
                if(check ===1){
                    switchSection();
                    updateDepth();
                }else{
                setOptionMenu();
            }
            onClose();
        }else{
            triggerAnimation('Wrong password ! try again');
        }
    }
    
    ////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////
    return(
        <>
            <MenuContainer onClose={onClose}>
                <h2 className="popup-title">Oops it s protected</h2>
                <p className="popup-subtitle">Try to hack it ? </p>
                <input className={`ModernInput ${inputAnimation}`}  type="password"
                onChange={(input)=>setPassword(input.target.value)}
                placeholder="Enter Your Password"/>
                <ErrorDisplay error={error}/>
                <button onClick={accessHandler}> try me !</button>
            </MenuContainer>
        </>
    )

}

/////////////////////////// PROMPT FOR NOTE CHECK IF SECURITY ///////////////////////// NOT COMPLICATED NOTHING TO COMMENT ////////////////////////////
export function AccessPromptNote({onClose , setHasAccess ,setOptionMenu, item, check} : 
    {onClose : ()=>void , setHasAccess : ()=>void, setOptionMenu :() => void  , item : Item , check : number}): JSX.Element {
        
        const {error, inputAnimation , triggerAnimation} = useInputErrorAnimation();
        const [password, setPassword] = useState<string>('');
        function accessHandler(){
            if(password === item.accessPassword){
                if(check ===1){ // check ===1 means user doubleclicked
                    ////////////////////////////////////////////////
                }else{
                setOptionMenu();
            }
            onClose();
        }else{
            triggerAnimation('Wrong password ! try again');
        }
    }
    
    ////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////
    return(
        <>
            <MenuContainer onClose={onClose}>
                <h2 className="popup-title">Oops it s protected</h2>
                <p className="popup-subtitle">Try to hack it ? </p>
                <input className={`ModernInput ${inputAnimation}`}  type="password"
                onChange={(input)=>setPassword(input.target.value)}
                placeholder="Enter Your Password"/>
                <ErrorDisplay error={error}/>
                <button onClick={accessHandler}> try me !</button>
            </MenuContainer>
        </>
    )
}

/////////////////////////// PROMPT FOR NOTE CHECK IF SECURITY ///////////////////////// NOT COMPLICATED NOTHING TO COMMENT ////////////////////////////
export function AccessPromptFile({onClose , setDropArea ,setOptionMenu, item, check} : 
    {onClose : ()=>void , setDropArea : ()=>void, setOptionMenu :() => void  , item : Item , check : number}): JSX.Element {
        const {error, inputAnimation , triggerAnimation} = useInputErrorAnimation();
        const [password, setPassword] = useState<string>('');
        function accessHandler(){
            if(password === item.accessPassword){
                if(check ===1){
                    if(item.filePath){downloadFile(item.id)}
                    else{setDropArea()}
                }else{
                setOptionMenu();
            }
            onClose()
        }else{
            triggerAnimation('Wrong password, try again you hacker')
        }
    }
    
    ////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////
    return(
    <>
        <MenuContainer onClose={onClose}>
                <h2 className="popup-title">Oops it s protected</h2>
                <p className="popup-subtitle">Try to hack it ? </p>
                <input className={`ModernInput ${inputAnimation}`}  type="password"
                onChange={(input)=>setPassword(input.target.value)}
                placeholder="Enter Your Password"/>
                <ErrorDisplay error={error}/>
                <button onClick={accessHandler}> try me !</button>
        </MenuContainer>
    </>
    )
}

