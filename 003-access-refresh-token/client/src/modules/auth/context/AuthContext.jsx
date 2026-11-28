import { createContext, useState,useContext } from "react";
export const AuthContext = createContext(null);
export const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(null);
    const[accessToken,setAccessToken]=useState(null);
    const[Loading,setLoading]=useState(null);

    const value={
        user,
        accessToken,
        Loading,
        isAuthenticated: !!user,
        setUser,
        setAccessToken,
        setLoading
    }
    return (
        <AuthContext.Provider value={{ user, setUser }}>
            {children}
        </AuthContext.Provider>
    );
};
export const useAuth =() =>
{
    const context=useContext(AuthContext)

    if(!context)
    {
        throw new Error("useAuth must be used within an AuthProvider")
    }
    return context
}

export default AuthContext;