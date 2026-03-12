import { useContext, useState, type JSX } from "react";
import { DeskContext } from "../../context/DeskContext";
import type { Desk } from "../../../shared/types";
import { DeskMenu } from "./DeskMenu";

////////////////////////////////////DESK SIDE JSX NOT MUCH TO SAY FOR NOW ////////////////////////////////////
///////////////////////// WILL HOST ALL SETTINGS FOR DESKS USER HAS ACCESS TO ////////////////////////////////////
export function DeskSide():JSX.Element{
    const deskContext = useContext(DeskContext);
    const [deskMenu , setDeskMenu] = useState<boolean>(false);
    const [selectedDesk , setSelectedDesk] = useState<Desk|null>(null);
    const desks = deskContext?.desks;
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
                        <button onClick={()=>{
                            setSelectedDesk(desk)
                            setDeskMenu(true)}}>⚙️</button>
                        {deskMenu &&
                        <DeskMenu 
                        onClose = {()=>setDeskMenu(false)}
                        selectedDesk = {selectedDesk}
                        />}
                    </div>
                ))}

            </div>
        </div>    
    )
}