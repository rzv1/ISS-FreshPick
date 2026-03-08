import {createContext, type ReactNode, useContext, useState} from "react";

interface AuthState {
    id: number | null;
    setId: (id: number | null) => void;
}

const AuthContext = createContext<AuthState>({
    id: null,
    setId: () => {},
});

interface AuthProviderProps{
    children: ReactNode;
}

export const AuthProvider = ({children}: AuthProviderProps) => {
    const [id, setId] = useState<number | null>(null);

    return(
        <AuthContext.Provider value={{id, setId}}>
            {children}
        </AuthContext.Provider>
    )
}
// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => useContext(AuthContext);