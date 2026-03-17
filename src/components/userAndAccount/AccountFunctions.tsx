import { useContext, useRef, useState, type JSX } from "react";
import { DeskContext } from "../../context/DeskContext";
import { changeAvatar } from "../../api/user";
import { UserContext } from "../../context/UserContext";

export function AvatarMenu({onClose} : {onClose : ()=>void}) : JSX.Element{
    const [areaClass , setAreaClass] = useState<string>('');
       const deskContext = useContext(DeskContext);
       const userContext = useContext(UserContext);
    
        async function handleUpdate(file : File){
            if(userContext?.user){
                const avatarFilePath = await changeAvatar(userContext.user.id,file);
                const newUser = {...userContext.user,avatarFilePath : avatarFilePath?.avatarFilePath};
                userContext.setNewUser(newUser);
            }
            setError('File not eligible to download')
        }
        const inputRef = useRef<HTMLInputElement>(null);
        
        
        ///////////////////////////////////////////////////////////////////////
        /////////////////////// ANIMATION HANDLER PART TO BE REUSED ////////////////
            ////////////////////////////////////////////////////////////////////
            const [animation , setAnimationD] = useState<string>('');
                function endwithease(){
                    setTimeout(()=>{
                        setAnimationD('fadeOut')
                        setTimeout((()=>{
                            onClose()}),500)
                },1)
            }
            const [error,setError] = useState<string|null>(null);
        ////////////////////////////////////////////////////////////////////////////////
        ////////////////////////////////////////////////////////////////////////////////
        return(
            <div className={`overlay ${animation}`} onClick={endwithease}>
                <div 
                className={`dropArea ${areaClass} `}
                onClick={(e)=>{e.stopPropagation()}}
                onDragOver={(e)=>{
                    e.preventDefault();
                    setAreaClass('highlighted')
                }}
                onDragLeave={()=>{
                    setAreaClass('');
                }}
                onDrop={async (e)=>{
                    e.preventDefault();
                    await handleUpdate(e.dataTransfer.files[0]);
                    endwithease();
                }}
                >
                    <div className="PopupDropZone" >
                    <div style={{gridColumn: "1 / -1", textAlign :"center" }}>
                    <h2 className="TitleDropZone">Drop Your New Pic</h2>
                    </div>
                    </div>
                    <span className="dropSeparator">or</span>
                    <div>
                    <button onClick={()=> inputRef.current?.click()}>
                        Select from computer 💻
                    </button>
                    <input 
                    type="file"
                    ref={inputRef}
                    style={{display:'none'}}
                    onChange={async (e)=> 
                        {e.target.files?.[0] && await handleUpdate(e.target.files[0]);
                        endwithease()
                        }} />
                    <button className="popup-close" onClick={endwithease}>✕</button>
                    </div>
                    {error && 
                     <span  className="errorDropZone">{error}</span>
                    }
                </div>
            </div>
        )
    }
