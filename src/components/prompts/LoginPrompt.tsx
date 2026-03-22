import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../context/UserContext";
import { useNavigate } from "react-router-dom";
import { MenuContainer } from "../../modals/Modal";
import { useModal } from "../../context/ModalContext";

/////////////////// LOGIN PROMPT ////////////// NAVIGATE TO HOME IF LOGGED ////////// PROTECTED ROUTE PREVENTS IF NOT //////////////
export function LoginPrompt(){
    const {closeModal} = useModal()  
    const navigate = useNavigate();
    const userContext = useContext(UserContext);
    const [mail , setMail] = useState<string>(''); 
    const [password, setPassword] = useState<string>('');
    const [error,setError] = useState<string|null>(null);
    const [inputAnimation , setInputAnimation] = useState<string>('');
    
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
                {error && 
                 <div className="PopupInside" style={{gridColumn: "1 / -1", textAlign :"center" }}>
                 <span  className="error">{error}</span>
                 </div>
                }
                <button onClick={handleLogin}> LOG IN FRIEND !</button>
            </MenuContainer>
        </>
    )
}