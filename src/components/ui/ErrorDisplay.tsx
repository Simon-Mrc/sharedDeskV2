import type { JSX } from "react";

export function ErrorDisplay ({error} :{error :string | null}) : JSX.Element{
    return(
       <>
           {error && 
                <div className="PopupInside" style={{gridColumn: "1 / -1", textAlign :"center" }}>
                <span  className="error">{error}</span>
                </div>
           }
       </>
   )
}