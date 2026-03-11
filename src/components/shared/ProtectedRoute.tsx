import { useContext, type JSX, type ReactNode } from "react";
import { UserContext } from "../../context/UserContext";
import { Navigate } from "react-router-dom";

/////////PROTECTED ROUTES //// ONLY 2 PAGES SO NOT VERY COMPLICATED /////////
export function ProtectedRoute({children} : {children : JSX.Element}){
    const userContext = useContext(UserContext);
    if(!userContext?.logged){
        return(
            <Navigate to='/login'/>
        )
    }
    return children
}