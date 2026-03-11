import type { JSX } from "react";
import { Sidebar } from "../components/layout/Sidebar";
import { DeskDisplay } from "../components/desk/DeskDisplay";

//////// HOME PAGE YOU DON T SAY //////////////
export function HomePage(): JSX.Element {
    return (
        <div className="globalContainer">
            <Sidebar />
            <DeskDisplay />
        </div>
    )
}