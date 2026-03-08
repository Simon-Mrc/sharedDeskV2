import { useContext, type JSX } from "react";
import { DeskContext } from "../context/DeskContext";

export function DeskSide():JSX.Element{
    const deskContext = useContext(DeskContext)
    const desks = deskContext?.desks
    return(
        <div className="desksSide">
            <div className="section-header">
                <h3>MY DESKS</h3>
            </div>
            <div className="search-row">
                <input placeholder="Search desks, folders, files..."/>
                <button >🔍</button>
            </div>
            <div className="deskList">
                {desks?.map((desk,index)=>(
                    <button key = {desk.id} onClick={()=>deskContext?.switchDesk(desk.id)}>{desk.name}</button>
                ))}

            </div>
        </div>    
    )
}