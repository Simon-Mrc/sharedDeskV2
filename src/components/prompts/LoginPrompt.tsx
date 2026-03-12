import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../context/UserContext";
import { useNavigate } from "react-router-dom";

/////////////////// LOGIN PROMPT ////////////// NAVIGATE TO HOME IF LOGGED ////////// PROTECTED ROUTE PREVENTS IF NOT //////////////
export function LoginPrompt({onClose, setAnimation} :{onClose : ()=>void, setAnimation : ()=>void}){
    const navigate = useNavigate();
    const userContext = useContext(UserContext);
    const [mail , setMail] = useState<string>(''); 
    const [password, setPassword] = useState<string>('');
    const [error,setError] = useState<string|null>(null);
    const [inputAnimation , setInputAnimation] = useState<string>('');
    useEffect(()=>{
        if(userContext?.logged){
            onClose();
            setAnimation();
            setTimeout(()=>{
                navigate('/');
            },500)
        }
    },[userContext?.logged])
    async function handleLogin(){
        try{
            await userContext?.login(mail,password);
            if(!userContext?.logged){
                setError('wrong Email or Password');
                setInputAnimation('shake');
                setTimeout(()=>{
                    setInputAnimation('');
                },500)  
            }
        }catch(error){
            setError('wrong Email or Password')
        }
    }
    return(
        <div className="overlay">
            <div className="PopupWithBlurr">
                <button className="popup-close" onClick={onClose}>✕</button>
                <h2 className="popup-title">Welcome back</h2>
                <p className="popup-subtitle">Log into your account</p>
                <input className="ModernInput"
                 onChange={(input)=>setMail(input.target.value)}
                 placeholder="Enter Your mail"/>
                <input className={`ModernInput ${inputAnimation}`} type="password"
                onChange={(input)=>setPassword(input.target.value)}
                placeholder="Enter Your Password"/>
                {error && 
                 <div className="PopupInside" style={{gridColumn: "1 / -1", textAlign :"center" }}>
                 <span  className="error">{error}</span>
                 </div>
                }
                <button onClick={handleLogin}> LOG IN FRIEND !</button>
            </div>
        </div>
    )

}