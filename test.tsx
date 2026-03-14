////////////////// NOTE CONTENT DOM FUNCTION ////////////////// FETCH AND UPDATE CONTENT FROM/TO DB //////////////////

////////////////// //////////////////
export function NoteContent ({onClose, coord, item} : {onClose : ()=>void , coord : {x:number,y:number} , item : Item}) : JSX.Element{
    const [error,setError] = useState<string|null>(null);
    const [arrayOfContent , setArrayOfContent] = useState<{userContent : string, userColor : string}[]|null>(null)
    const userContext = useContext(UserContext);
    const [oldContent , setOldContent] = useState<{userName : string , userColor : string , userContent : string }[] |null>(null)
    const [newcontent , setNewContent] = useState<{userName : string , userColor : string , userContent : string } |null>(null)
    async function contentInit(){
        const note = await getNoteById(item.id);
        note ? setOldContent(JSON.parse(note.content)) : setError('Note must have been deleted')
    }
    
//////////////// NEVER FORGET THIS !!! OR LOOP FOREVER ////////////////
    useEffect(()=>{
        contentInit();
    },[])

    ////////////// UPDATE CONTENT AND IN UPDATE TABLE ///////////
    async function contentHandler(){
        if(newcontent && newcontent.userContent){
            const needUpdate = [...(oldContent ?? []),newcontent]
            const contentUpdated = await updateNoteContent(item.id,JSON.stringify(needUpdate));
            !contentUpdated && setError('Failed to save Note ! Plz try again');
        }
        if(newcontent && newcontent.userContent === ''){
            const contentUpdated = await updateNoteContent(item.id,JSON.stringify(oldContent));
        }
    }
    
    //////////////////// AUTO SAVE EVERY 1 SEC USER DON T TYPE /////////////
    useEffect(()=>{
        const timer = setTimeout(()=>{
            contentHandler();
        },1500)
        return()=> clearTimeout(timer)
    },[newcontent?.userContent])

    ///////////////////////////////////////////////////////////////////////
    /////////////////////// ANIMATION HANDLER PART TO BE REUSED ////////////////
        ////////////////////////////////////////////////////////////////////
        const [animation , setAnimationD] = useState<string>('foldin');
            function endwithease(){
                setTimeout(()=>{
                    setAnimationD('foldout')
                    setTimeout((()=>{
                        onClose()}),500)
            },1)
        }
    ////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////
    return(
        <div className={`overlay ${animation}`}>
            <div className={`NoteContainer ${animation}`}onClick={(e)=>e.stopPropagation()} style={{
                left : coord.x,
                top : coord.y,
                position : "relative"}}>
                <button className="CloseNoteBtn" onClick={endwithease}>✕</button>
                <h2 className="TitleForNote">{item.name}</h2>
                {oldContent?.map((object)=>(
                <div className=""     
                style={{color : object.userColor}} > {`${object.userContent} by : ${object.userName}` } </div>         
                ))}
                <textarea className="NoteContent"
                value={newcontent?.userContent ?? '' }
                 onChange={(input)=>setNewContent({userName : userContext.user.userName ,userColor :userContext.user.userColor ,  userContent : input.target.value})}
                 placeholder="Your imagination is the limite lol"/>
                
                {error && 
                 <div className="PopupNote">
                 <span  className="NoteError">{error}</span>
                 </div>
                }
                <button onClick={contentHandler}> SaveNote !</button>
            </div>
        </div>
    )
}