import type { JSX } from "react";
import { Sidebar } from "../components/Sidebar";
import { DeskDisplay } from "../components/DeskDisplay";

// this is your current App.tsx content — just moved here!
export function HomePage(): JSX.Element {
    return (
        <div className="globalContainer">
            <Sidebar />
            <DeskDisplay />
        </div>
    )
}