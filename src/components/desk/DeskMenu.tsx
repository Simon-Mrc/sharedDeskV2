import { useState, type JSX } from "react";
import { MenuContainer } from "../../modals/Modal";
import { useModal } from "../../context/ModalContext";

////////////////////////////////////BIG ONE HERE OPTION MENU  ////////////////////////////////////
//////////////////////////// ROOT OF ALL STATE FOR SHAREDDESK MENU FUNCTIONS ////////////////////////////////////
export function DeskMenu () : JSX.Element{
    const {closeModal,openModal,data} = useModal();
    const [input , setInput] = useState<string>('');

    return(
        <>
            <MenuContainer onClose={()=>closeModal()}>
                <div style={{gridColumn: "1 / -1", display : "flex", maxWidth : "100%" }}>
                    <input className="ModernInput"
                    onChange={(e)=>setInput(e.target.value)}
                    placeholder='Enter your friend Name or userName' />

                    <button style={{maxWidth :"20%"}}>🔍</button>
                </div>
                <button onClick={()=>{openModal('deskInviteMenu',data)}}>Invite Friends !</button>
                <button >Quit Desk</button>
                <button >Delete Desk</button>
                <button >Give Desk</button>
            </MenuContainer>
        </>
    )
}