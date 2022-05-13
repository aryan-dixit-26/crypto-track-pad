import { createContext, useEffect, useState } from "react";

const headerContext = createContext();

export function ContextProvider({children}){
    const [currency, setCurrency] = useState("INR");
    const [symbol, setSymbol] = useState("₹");
    useEffect(()=>{ 
        if(currency === "INR")
         setSymbol("₹")
        if(currency === "USD")
        setSymbol("$")
    },[currency])
    return (
        <headerContext.Provider value={{currency, symbol, setCurrency}}>
            {children}
        </headerContext.Provider>
    )
}


export default headerContext;