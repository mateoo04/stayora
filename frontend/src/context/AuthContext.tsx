import { createContext, useContext, useEffect, useState } from "react";
import type { AuthState, LoginRequest, SignupRequest } from "../types/auth";
import { api } from "../api/client";
import { apiLogin, apiSignup } from "../api/auth";
import axios from "axios";

interface AuthContextType {
    user: AuthState | null;
    isAuthenticated: boolean;
    authErrorCode?: string;
    login: (data: LoginRequest) => Promise<void>;
    signup: (data: SignupRequest) => Promise<void>;
    logOut: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({children}: {children: React.ReactNode}) {
const [user, setUser] = useState<AuthState | null>(null);
const [authErrorCode, setAuthErrorCode] = useState<string | undefined>(undefined);

    useEffect(() => {
        const storedUser = localStorage.getItem('authUser');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);

  async function signup(data: SignupRequest) {
    setAuthErrorCode(undefined);

    let res;
    try { res = await apiSignup(data);
    }
    catch (error) {
        if(axios.isAxiosError(error)){
            setAuthErrorCode(error.response?.data?.code);
            console.log("error code:", error.response?.data?.code);
        }
    }
    const auth = res?.data;
    if(auth){
    localStorage.setItem("auth", JSON.stringify(auth));
    setUser(auth);
}
  }

    const login = async (data: LoginRequest) => {
        let res 
        try {res = await apiLogin(data);}
        catch (error) {
            if(axios.isAxiosError(error)){
            setAuthErrorCode(error.response?.data?.code);
            console.log("error code:", error.response?.data?.code);
        }
        }
        const auth = res?.data;
        if(auth) {setUser(auth);
        localStorage.setItem('authUser', JSON.stringify(auth));

        api.defaults.headers.common.Authorization = auth.token;}
    };

  function logOut() {
    localStorage.removeItem("auth");
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, authErrorCode, login, signup, logOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
    const context =  useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
}