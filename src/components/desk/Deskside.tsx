import { useContext, type JSX } from "react";
import { DeskContext } from "../../context/DeskContext";
import { useModal } from "../../context/ModalContext";

////////////////////////////////////DESK SIDE JSX NOT MUCH TO SAY FOR NOW ////////////////////////////////////
///////////////////////// WILL HOST ALL SETTINGS FOR DESKS USER HAS ACCESS TO ////////////////////////////////////
export function DeskSide():JSX.Element{
    const deskContext = useContext(DeskContext);
    const desks = deskContext?.desks;
    const {openModal} = useModal();
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
                {desks?.map((desk)=>(
                    <div key = {desk.id} className="deskListInside">
                        <button  onClick={()=>deskContext?.switchDesk(desk.id)}>{desk.name}{deskContext?.containsNew(desk.id)&& '✨'}</button>
                        <button onClick={()=>{openModal('deskMenu',desk)}}>⚙️</button>
                    </div>
                ))}

            </div>
        </div>    
    )
}