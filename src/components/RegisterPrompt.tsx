import { useContext, useEffect, useState } from "react";
import { UserContext } from "../context/UserContext";
import { loginUser, registerUser } from "../api/user";
import type { User } from "../../shared/types";
import { useNavigate } from "react-router-dom";

export function RegisterPrompt({onClose} : {onClose : ()=>void}){
    const navigate = useNavigate();
    const userContext = useContext(UserContext);
    const [name,setName] = useState<string>('');
    const [userName,setUserName] = useState<string>('');
    const [mail,setMail] = useState<string>('');
    const [password,setPassword] = useState<string>('');
    const [error,setError] = useState('');

    useEffect(()=>{
        if(userContext?.logged){
            onClose();
            navigate('/');
        }

    },[userContext?.logged])
    async function handleRegister (){
        try{
            const newUser : Omit<User,'password'> = await registerUser({name,userName,mail,password});
            console.log('test1');
            if(newUser?.id){
                console.log('test2');
                await userContext?.login(mail,password);
                console.log(userContext?.logged);
            }else{
                setError('Email or UserName already taken');
            }
        }catch{
            setError('Server issue plz try again later')
            console.log('Unable to acces db');
        }

    }
    return(
        <div className="overlay">
            <div className="PopupWithBlurr">
                <button className="popup-close" onClick={onClose}>✕</button>
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
                <input className="ModernInput" 
                onChange={(input)=>setPassword(input.target.value)}/>
                {error && <span className="error">{error}</span>}
                <button onClick={handleRegister}> REGISTER MY FRIEND !</button>
            </div>
        </div>
    )
}