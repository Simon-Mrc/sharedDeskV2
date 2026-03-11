import { useContext, type JSX } from "react";
import { DeskContext } from "../../context/DeskContext";

////////////////////////////////////DESK SIDE JSX NOT MUCH TO SAY FOR NOW ////////////////////////////////////
///////////////////////// WILL HOST ALL SETTINGS FOR DESKS USER HAS ACCESS TO ////////////////////////////////////
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
                    <div key = {desk.id} className="deskListInside">
                        <button  onClick={()=>deskContext?.switchDesk(desk.id)}>{desk.name}</button>
                        <button>⚙️</button>
                    </div>
                ))}

            </div>
        </div>    
    )
}