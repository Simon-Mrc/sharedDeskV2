import { useContext, type JSX, type ReactNode } from "react";
import { UserContext } from "../context/UserContext";
import { Navigate } from "react-router-dom";
import { useNavigate } from 'react-router-dom'


export function ProtectedRoute({children} : {children : JSX.Element}){
    const userContext = useContext(UserContext);
    if(!userContext?.logged){
        return(
            <Navigate to='/login'/>
        )
    }
    return children
}