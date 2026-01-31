
import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState(null); // start as null

    useEffect(() => {
        const data = localStorage.getItem("auth");
        if (data) {
            setAuth(JSON.parse(data));
        } else {
            setAuth(false); 
        }
    }, []); //RUN ONLY ONCE

    return (
        <AuthContext.Provider value={{ auth, setAuth }}>
            {children}
        </AuthContext.Provider>
    );
};

// custom hook
export const useAuth = () => useContext(AuthContext);

export default AuthProvider;
