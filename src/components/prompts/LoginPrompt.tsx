import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../context/UserContext";
import { useNavigate } from "react-router-dom";
import { MenuContainer } from "../../modals/Modal";
import { useModal } from "../../context/ModalContext";
import { useInputErrorAnimation } from "../../customHooks/useAnimation";
import { ErrorDisplay } from "../ui/ErrorDisplay";
import { useEnterKey } from "../../customHooks/useEnterKey";

/////////////////// LOGIN PROMPT ////////////// NAVIGATE TO HOME IF LOGGED ////////// PROTECTED ROUTE PREVENTS IF NOT //////////////
export function LoginPrompt(){
    const {closeModal} = useModal()  
    const navigate = useNavigate();
    const userContext = useContext(UserContext);
    const [mail , setMail] = useState<string>(''); 
    const [password, setPassword] = useState<string>('');
    const {error, inputAnimation, triggerAnimation} = useInputErrorAnimation();
    useEnterKey(handleLogin);
    
    useEffect(()=>{
        if(userContext?.logged){
            closeModal();
            setTimeout(()=>{
                navigate('/');
            },500)
        }
    },[userContext?.logged])

    async function handleLogin(){
        try{
            userContext?.login(mail,password);
            if(!userContext?.logged){
                setTimeout(()=>{
                    triggerAnimation('Wrong mail or password')
                },100)
            }
        }catch(error){
            triggerAnimation('Check internet connection')
        }
    }
   
   
    ////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////
    return(
        <>
            <MenuContainer onClose={()=>closeModal()}>
                <h2 className="popup-title">Welcome back</h2>
                <p className="popup-subtitle">Log into your account</p>
                <span>Mail</span>
                <input className="ModernInput"
                 onChange={(input)=>setMail(input.target.value)}
                 placeholder="Enter Your mail"/>
                 <span>Password</span>
                <input className={`ModernInput ${inputAnimation}`} type="password"
                onChange={(input)=>setPassword(input.target.value)}
                placeholder="Enter Your Password"/>          
                <ErrorDisplay error = {error} />        
                <button onClick={handleLogin}> LOG IN FRIEND !</button>
            </MenuContainer>
        </>
    )
}