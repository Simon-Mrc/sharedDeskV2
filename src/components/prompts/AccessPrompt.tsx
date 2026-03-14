import { useState, type JSX } from "react";
import type { Item } from "../../../shared/types";

/////////////////////////// PROMPT FOR FOLDER CHECK IF SECURITY ///////////////////////// NOT COMPLICATED NOTHING TO COMMENT ////////////////////////////
export function AccessPromptFolder({onClose , setHasAccess ,switchSection,updateDepth,setOptionMenu, item, check} : 
    {onClose : ()=>void , setHasAccess : ()=>void, switchSection : ()=>void ,updateDepth : ()=>void , setOptionMenu :() => void  , item : Item , check : number}): JSX.Element {
        
        const [password, setPassword] = useState<string>('');
        const [error ,setError] = useState<string>('');
        const [inputAnimation, setInputAnimation] = useState<string>('');
        function accessHandler(){
            if(password === item.accessPassword){
                if(check ===1){
                    switchSection();
                    updateDepth();
                }else{
                setOptionMenu();
            }
            endwithease();
        }else{
            setError('Wrong password ! try again');
            setInputAnimation('shake');
            setTimeout(()=>{
                setInputAnimation('');
            },500)
        }
    }
    
    
    ///////////////////////////////////////////////////////////////////////
    /////////////////////// ANIMATION HANDLER PART TO BE REUSED ////////////////
        ////////////////////////////////////////////////////////////////////
        const [animation , setAnimation] = useState<string>('');
            function endwithease(){
                setTimeout(()=>{
                    setAnimation('fadeOut')
                    setTimeout((()=>{
                        onClose()}),500)
            },1)
        }
    ////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////
    return(
        <div className={`overlay ${animation}`}>
            <div className={`PopupWithBlurr`}>
                <button className="popup-close" onClick={endwithease}>✕</button>
                <h2 className="popup-title">Oops it s protected</h2>
                <p className="popup-subtitle">Try to hack it ? </p>
                <input className={`ModernInput ${inputAnimation}`}  type="password"
                onChange={(input)=>setPassword(input.target.value)}
                placeholder="Enter Your Password"/>
                {error && 
                 <div className="PopupInside" style={{gridColumn: "1 / -1", textAlign :"center" }}>
                 <span  className="error">{error}</span>
                 </div>
                }
                <button onClick={accessHandler}> try me !</button>
            </div>
        </div>
    )

}

/////////////////////////// PROMPT FOR NOTE CHECK IF SECURITY ///////////////////////// NOT COMPLICATED NOTHING TO COMMENT ////////////////////////////
export function AccessPromptNote({onClose , setHasAccess ,setOptionMenu, item, check} : 
    {onClose : ()=>void , setHasAccess : ()=>void, setOptionMenu :() => void  , item : Item , check : number}): JSX.Element {
        
        const [password, setPassword] = useState<string>('');
        const [error ,setError] = useState<string>('');
        const [inputAnimation, setInputAnimation] = useState<string>('');
        function accessHandler(){
            if(password === item.accessPassword){
                if(check ===1){ // check ===1 means user doubleclicked
                    ////////////////////////////////////////////////
                }else{
                setOptionMenu();
            }
            endwithease();
        }else{
            setError('Wrong password ! try again');
            setInputAnimation('shake');
            setTimeout(()=>{
                setInputAnimation('');
            },500)
        }
    }
    
    
    ///////////////////////////////////////////////////////////////////////
    /////////////////////// ANIMATION HANDLER PART TO BE REUSED ////////////////
        ////////////////////////////////////////////////////////////////////
        const [animation , setAnimation] = useState<string>('');
            function endwithease(){
                setTimeout(()=>{
                    setAnimation('fadeOut')
                    setTimeout((()=>{
                        onClose()}),500)
            },1)
        }
    ////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////
    return(
        <div className={`overlay ${animation}`}>
            <div className={`PopupWithBlurr`}>
                <button className="popup-close" onClick={endwithease}>✕</button>
                <h2 className="popup-title">Oops it s protected</h2>
                <p className="popup-subtitle">Try to hack it ? </p>
                <input className={`ModernInput ${inputAnimation}`}  type="password"
                onChange={(input)=>setPassword(input.target.value)}
                placeholder="Enter Your Password"/>
                {error && 
                 <div className="PopupInside" style={{gridColumn: "1 / -1", textAlign :"center" }}>
                 <span  className="error">{error}</span>
                 </div>
                }
                <button onClick={accessHandler}> try me !</button>
            </div>
        </div>
    )
}

/////////////////////////// PROMPT FOR NOTE CHECK IF SECURITY ///////////////////////// NOT COMPLICATED NOTHING TO COMMENT ////////////////////////////
export function AccessPromptFile({onClose , setHasAccess ,setOptionMenu, item, check} : 
    {onClose : ()=>void , setHasAccess : ()=>void, setOptionMenu :() => void  , item : Item , check : number}): JSX.Element {
        
        const [password, setPassword] = useState<string>('');
        const [error ,setError] = useState<string>('');
        const [inputAnimation, setInputAnimation] = useState<string>('');
        function accessHandler(){
            if(password === item.accessPassword){
                if(check ===1){ // check ===1 means user doubleclicked
                    ////////////////////////////////////////////////
                }else{
                setOptionMenu();
            }
            endwithease();
        }else{
            setError('Wrong password ! try again');
            setInputAnimation('shake');
            setTimeout(()=>{
                setInputAnimation('');
            },500)
        }
    }
    
    
    ///////////////////////////////////////////////////////////////////////
    /////////////////////// ANIMATION HANDLER PART TO BE REUSED ////////////////
        ////////////////////////////////////////////////////////////////////
        const [animation , setAnimation] = useState<string>('');
            function endwithease(){
                setTimeout(()=>{
                    setAnimation('fadeOut')
                    setTimeout((()=>{
                        onClose()}),500)
            },1)
        }
    ////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////
    return(
        <div className={`overlay ${animation}`}>
            <div className={`PopupWithBlurr`}>
                <button className="popup-close" onClick={endwithease}>✕</button>
                <h2 className="popup-title">Oops it s protected</h2>
                <p className="popup-subtitle">Try to hack it ? </p>
                <input className={`ModernInput ${inputAnimation}`}  type="password"
                onChange={(input)=>setPassword(input.target.value)}
                placeholder="Enter Your Password"/>
                {error && 
                 <div className="PopupInside" style={{gridColumn: "1 / -1", textAlign :"center" }}>
                 <span  className="error">{error}</span>
                 </div>
                }
                <button onClick={accessHandler}> try me !</button>
            </div>
        </div>
    )
}