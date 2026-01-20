import { createContext, useContext, useEffect, useState } from "react";
import type { AuthState, LoginRequest, SignupRequest } from "../types/auth";
import { api } from "../api/client";
import { apiGetCurrentUser, apiLogin, apiSignup } from "../api/auth";
import axios from "axios";
import { useNavigate } from "react-router-dom";

interface AuthContextType {
    user: AuthState | null;
    isAuthenticated: boolean;
    authErrorCode?: string;
    login: (data: LoginRequest) => Promise<void>;
    signup: (data: SignupRequest) => Promise<void>;
    logOut: () => void;
    isAdmin: () => boolean;
    isHost: () => boolean;
    isGuest: () => boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({children}: {children: React.ReactNode}) {
const [user, setUser] = useState<AuthState | null>(null);
const [authErrorCode, setAuthErrorCode] = useState<string | undefined>(undefined);

    useEffect(() => {
        async function loadUserFromStorage() {
            const token = localStorage.getItem("auth");
            if (token) {
                try {
                    const res = await apiGetCurrentUser();
                    if(res) setUser(res.data);
                } catch (error) {
                    console.error("Failed to load user from storage:", error);
                    //localStorage.removeItem("auth");
                    setUser(null);
                }
            }
        }

        loadUserFromStorage();
    }, []);

  async function signup(data: SignupRequest) {
    setAuthErrorCode(undefined);

    let res;
    try { res = await apiSignup(data);
    }
    catch (error) {
        if(axios.isAxiosError(error)){
            setAuthErrorCode(error.response?.data?.code);
        }
    }
    const auth = res?.data;
    const token = auth?.token;
    if(token){
    localStorage.setItem("auth", token);
    setUser(auth);
}
  }

    const login = async (data: LoginRequest) => {
        let res 
        try {res = await apiLogin(data);}
        catch (error) {
            if(axios.isAxiosError(error)){
            setAuthErrorCode(error.response?.data?.code);
        }
        }
        const auth = res?.data;
        if(auth) {setUser(auth);
        localStorage.setItem('auth', auth.token);

        api.defaults.headers.common.Authorization = auth.token;}
    };

  function logOut() {
    localStorage.removeItem("auth");
    setUser(null);
  }

  function isAdmin() {
    return user?.role === "ADMIN";
  }

  function isHost() {
    return user?.role === "HOST";
  }

  function isGuest() {
    return user?.role === "GUEST";
  }

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, authErrorCode, login, signup, logOut, isAdmin, isHost, isGuest }}>
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