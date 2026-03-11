import { useContext } from "react";
import { DeskContext } from "../../context/DeskContext";
import type { DeskContextType} from "../../../shared/types";

export function NotAshamedTree({onClose} : {onClose : ()=>void }){
    const deskContext = useContext(DeskContext);
    function buildTree(items :DeskContextType['items'], parentId : string | null, prefix = '') {
        let result = '';
        let children = items?.filter(item => String(item.parentId) === String(parentId));
        children?.forEach((item, index) => {
            let isLast = index === children.length - 1;
            let connector = isLast ? '└── ' : '├── ';
            let icon = item.type === 'folder' ? '📁' : '📄';
            result += prefix + connector + icon + ' ' + item.name + '\n';
            if(item.type === 'folder'){
                let newPrefix = prefix + (isLast ? '    ' : '│   ');
                result += buildTree?.(items, item.id, newPrefix);
            }
        });
        return result;
    }
    let items = deskContext?.items;
    let treeText = '🖥️ ' + deskContext?.currentDesk?.name+ '\n';
    if(items){
        treeText += buildTree(items, null);
    }

    return(
        <div className="notAshamedtreeContainer">
            <button onClick={()=> onClose()}>❌ Close</button>
            <pre>{treeText}</pre>
        </div>
    )
}