import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../context/UserContext";
import { registerUser } from "../../api/user";
import type { User } from "../../../shared/types";
import { useNavigate } from "react-router-dom";


//////////////////////////////////// REGISTER PROMPT ////////////////////////////////////
/////////// AUTOMATIC LOG AFTER CREATION OF USER //// NAVIGATE TO HOMEPAGE //////////////
export function RegisterPrompt({onClose, setAnimation} : {onClose : ()=>void, setAnimation : ()=>void}){
    const navigate = useNavigate();
    const userContext = useContext(UserContext);
    const [name,setName] = useState<string>('');
    const [userName,setUserName] = useState<string>('');
    const [mail,setMail] = useState<string>('');
    const [password,setPassword] = useState<string>('');
    const [error,setError] = useState('');
/////// AS SOON AS CREATED ===> NAVIGATE TO HOME PAGE /////////////
useEffect(()=>{
    if(userContext?.logged){
        onClose();
        setAnimation();
        setTimeout(()=>{
            navigate('/');
        },500)
    }
    },[userContext?.logged])
    
    async function handleRegister (){
        try{
            const newUser : Omit<User,'password'> |null = await registerUser({name,userName,mail,password});
            if(newUser?.id){
                await userContext?.login(mail,password);
            }else{
                setError('Email or UserName already taken');
            }
        }catch{
            setError('Server issue plz try again later')
        }
    }
    
    ///////////////////////////////////////////////////////////////////////
    /////////////////////// ANIMATION HANDLER PART TO BE REUSED ////////////////
        ////////////////////////////////////////////////////////////////////
        const [animation , setAnimationd] = useState<string>('');
            function endwithease(){
                setTimeout(()=>{
                    setAnimationd('fadeOut')
                    setTimeout((()=>{
                        onClose()}),500)
            },1)
        }
    ////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////
  
    return(
        <div className={`overlay ${animation}`} onClick={endwithease}>
            <div className="PopupWithBlurr" onClick={(e)=>{e.stopPropagation()}}>
                <button className="popup-close" onClick={endwithease}>✕</button>
                <h2 className="popup-title">Welcome New Comer !</h2>
                <p className="popup-subtitle">Create Your New account</p>
                <input className="ModernInput"
                 onChange={(input)=>setName(input.target.value)}
                 placeholder="Enter Your Name"/>
                 <input className="ModernInput"
                 onChange={(input)=>setUserName(input.target.value)}
                 placeholder="Enter Your UserName"/>                
                <input className="ModernInput"
                 onChange={(input)=>setMail(input.target.value)}
                 placeholder="Enter Your mail"/>
                <input className="ModernInput" type="password"
                onChange={(input)=>setPassword(input.target.value)}
                placeholder="Enter Your Password"/>
                {error && 
                 <div className="PopupInside" style={{gridColumn: "1 / -1", textAlign :"center" }}>
                 <span  className="error">{error}</span>
                 </div>
                }
                <button onClick={handleRegister}> REGISTER MY FRIEND !</button>
            </div>
        </div>
    )
}