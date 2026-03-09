import { useContext, useEffect, useState } from "react";
import { UserContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";

export function LoginPrompt({onClose} :{onClose : ()=>void}){
    const navigate = useNavigate();
    const userContext = useContext(UserContext);
    const [mail , setMail] = useState<string>(''); 
    const [password, setPassword] = useState<string>('');
    const [error,setError] = useState<string|null>(null);
    useEffect(()=>{
        if(userContext?.logged){
            onClose();
            navigate('/');
        }
    },[userContext?.logged])
    async function handleLogin(){
        setError(null);
        try{
            await userContext?.login(mail,password);
            if(!userContext?.logged){setError('wrong Email or Password')}
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
                <input className="ModernInput" 
                onChange={(input)=>setPassword(input.target.value)}/>
                {error && <span className="error">{error}</span>}
                <button onClick={handleLogin}> LOG IN FRIEND !</button>
            </div>
        </div>
    )

}