import { useContext, useEffect, type JSX } from "react";
import { SectionContext } from "../context/SectionContext";
import { DeskContext } from "../context/DeskContext";
import type { Item } from "../../shared/types";
import { PlaceFile } from "./PlaceFile";
import { PlaceFolder } from "./PlaceFolder";

export function DeskDisplay():JSX.Element{
    const sectionContext = useContext(SectionContext);
    const deskContext = useContext(DeskContext);
    const arrayOfItem = deskContext?.items?.filter(
        item=>item.parentId===sectionContext?.currentSection
    ) ?? [];

    return(
        <div className="centerDisplayed">

        <div className="globalHome">
            {Array.from({ length: sectionContext?.depth ?? 0 }).map((_, index) => (
                <div key={index} className="ranged"/>
            ))}
            <div className="desk-column-large section-enter">
            {arrayOfItem.map((item)=>(
                item.type === 'folder'
                ? <PlaceFolder key = {item.id} item = {item}/>
                : <PlaceFile key = {item.id} item = {item}/>
            )
            )}
            </div>

        </div>
      </div>
    )
}