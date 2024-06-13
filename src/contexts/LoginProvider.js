import { createContext, useEffect, useState } from "react";
import { localStorageKey } from "../constants";

const LoginContext = createContext();

const LoginProvider = ({children}) => {
    const [login, setLogin] = useState(false)
    const storage = JSON.parse(localStorage.getItem(localStorageKey));

    

    return(
        <LoginContext.Provider value = {{login, setLogin, storage}}>
            {children}
        </LoginContext.Provider>
    )

}

export {LoginContext, LoginProvider}