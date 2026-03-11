import type { JSX } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { ProtectedRoute } from "./components/shared/ProtectedRoute";
import { HomePage } from "./pages/HomePage";
import { LoginPage } from "./pages/LoginPage";

////////////////// POLICEMAN AT WORK HERE /////////////////
export function App(): JSX.Element {
    return (
        <Routes>
            {/* public routes — anyone can access */}
            <Route path="/login"    element={<LoginPage />} />

            {/* protected route — must be logged in */}
            <Route path="/" element={
                <ProtectedRoute>
                    <HomePage />
                </ProtectedRoute>
            }/>

            {/* catch-all — unknown URL → redirect home */}
            <Route path="*" element={<Navigate to="/" />} />
        </Routes>
    )
}