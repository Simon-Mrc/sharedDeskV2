import { useContext } from "react";
import { DeskContext } from "../../context/DeskContext";
import type { DeskContextType} from "../../../shared/types";
import type { JSX } from "react";

////////////////// USED TO BE ASHAMED AI GENERATED TREE //////////////////
////////////////// WELL NOT ANYMORE !! REWRITE IT WITH REACT ANT TS //////////////////
///////////// NEED TO BE REWORK BECAUSE OF 2 ISSUES : ACCESSPASSWORD AND DEPTH UPDATES /////////////////////////

export function NotAshamedTree({ onClose, switchSection, updateDepth}: { 
    onClose: () => void;
    switchSection: (itemId: string | null) => void; 
    updateDepth : (depth : number) =>void 
}) {
    const deskContext = useContext(DeskContext);

    function buildTree(
        items: DeskContextType['items'],
        parentId: string | null,
        prefix = '',
        depth = 0
    ): JSX.Element[] {
        const result: JSX.Element[] = [];
        const children = items?.filter(item => String(item.parentId) === String(parentId)) ?? [];

        children.forEach((item, index) => {
            const isLast = index === children.length - 1;
            const connector = isLast ? '└── ' : '├── ';
            const icon = item.type === 'folder' ? (item.accessPassword ?'📁🔒' :'📁' ) : (item.accessPassword ?'📄🔒':'📄');

            result.push(
                <span key={item.id} style={{ display: 'block' }}>
                    {prefix + connector}
                    <a
                        onClick={() => {switchSection((item.type ==='file')? item.parentId : item.id); updateDepth((item.type ==='file')? depth : (depth))}} // 👈 calls your function on click
                        style={{ cursor: 'pointer', textDecoration: 'none' }}
                        title={`Open ${item.name}`}
                    >
                        {icon} {item.name}
                    </a>
                </span>
            );

            if (item.type === 'folder') {
                const newPrefix = prefix + (isLast ? '    ' : '│   ');
                depth = depth+1;
                result.push(...buildTree(items, item.id, newPrefix,depth));
            }
        });

        return result;
    }

    const items = deskContext?.items;

    return (
        <div className="notAshamedtreeContainer">
            <button onClick={() => onClose()}>❌ Close</button>
            <pre>
                <span style={{ display: 'block' }} ><a onClick={()=>{switchSection(null);updateDepth(0)}} style={{ cursor: 'pointer', textDecoration: 'none' }}>{'🖥️'} {deskContext?.currentDesk?.name}</a></span>
                {items && buildTree(items, null)}
            </pre>
        </div>
    );
}