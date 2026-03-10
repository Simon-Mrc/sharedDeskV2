import type { Item } from "../../shared/types"
export function OptionMenu({onClose ,coord, item} : {onClose : ()=>void , coord : {x:number,y:number}, item : Item}){
    return(
        <div className="overlay" onClick={()=>onClose()}>
            <div className="PopupWithBlurrOption" onClick={(e)=>e.stopPropagation()} style={{
                left : coord.x,
                top : coord.y}}>
                <button >Rename!</button>
                <button >Delete!</button>
                <button >Set Password!</button>
                <button >Set RickRoll!</button>
                <button >duplicate!</button>
                <button className="popup-closeOption" onClick={onClose}>✕</button>
            </div>
        </div>
    )
}