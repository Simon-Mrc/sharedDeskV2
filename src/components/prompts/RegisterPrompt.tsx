import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../context/UserContext";
import { registerUser } from "../../api/user";
import { useNavigate } from "react-router-dom";
import { MenuContainer } from "../../modals/Modal";
import { useModal } from "../../context/ModalContext";
import { ErrorDisplay } from "../ui/ErrorDisplay";
import { useInputErrorAnimation } from "../../customHooks/useAnimation";
import { useEnterKey } from "../../customHooks/useEnterKey";


//////////////////////////////////// REGISTER PROMPT ////////////////////////////////////
/////////// AUTOMATIC LOG AFTER CREATION OF USER //// NAVIGATE TO HOMEPAGE //////////////
export function RegisterPrompt(){
    const {prevModal} = useModal();
    const navigate = useNavigate();
    const userContext = useContext(UserContext);
    const [name,setName] = useState<string>('');
    const [userName,setUserName] = useState<string>('');
    const [mail,setMail] = useState<string>('');
    const [password,setPassword] = useState<string>('');
    const [passwordConfirm,setPasswordConfirm] = useState<string>('');
    const {error, inputAnimation, triggerAnimation} = useInputErrorAnimation()
    const [check, setCheck] = useState<number>(0);
/////// AS SOON AS CREATED ===> NAVIGATE TO HOME PAGE /////////////
useEffect(()=>{
    if(userContext?.logged){
        prevModal()
        setTimeout(()=>{
            navigate('/');
        },500)
    }
    },[userContext?.logged])
    
    async function handleRegister (){
        if (password === passwordConfirm){
            try{
                const newUser = await registerUser({name,userName,mail,password});
                if(newUser?.id){
                    userContext?.login(mail,password);
                }else{
                    setCheck(1);
                    triggerAnimation('Email or UserName already taken');
                }
            }catch{
                triggerAnimation('Server issue plz try again later')
            }
        }else{
            setCheck(3);
            triggerAnimation('The passwords are not the same');
        }
    }
    useEnterKey(handleRegister)
    ////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////
  
    return(
        <>
            <MenuContainer onClose={()=>prevModal()}>
                <h2 className="popup-title">Welcome New Comer !</h2>
                <p className="popup-subtitle">Create Your New account</p>
                <span>Name</span>
                <input className="ModernInput"
                 onChange={(input)=>setName(input.target.value)}
                 placeholder="Enter Your Name"/>
                 <span>Username</span>
                 <input className={check ===1 ?`ModernInput ${inputAnimation}` : `ModernInput`}
                 onChange={(input)=>setUserName(input.target.value)}
                 placeholder="Enter Your UserName"/> 
                 <span>Mail</span>               
                <input className={check ===1 ?`ModernInput ${inputAnimation}` : `ModernInput`} type="mail"
                 onChange={(input)=>setMail(input.target.value)}
                 placeholder="Enter Your mail"/>
                 <span>Password</span>
                <input className={check ===3 ?`ModernInput ${inputAnimation}` : `ModernInput`} type="password"
                onChange={(input)=>setPassword(input.target.value)}
                placeholder="Enter Your Password"/>
                 <input className={check ===3 ?`ModernInput ${inputAnimation}` : `ModernInput`} type="password"
                onChange={(input)=>setPasswordConfirm(input.target.value)}
                placeholder="Confirm Your Password"/>
                <ErrorDisplay error = {error} />
                <button onClick={handleRegister}> REGISTER MY FRIEND !</button>
                </MenuContainer>
        </>
    )
}