import type { JSX } from "react";
import { Sidebar } from "./components/Sidebar";
import { DeskDisplay } from "./components/DeskDisplay";

export function App(): JSX.Element {
    return (
       <div className="globalContainer">
            <Sidebar />
            <DeskDisplay />
        </div>
    )
}