import {api} from "./client";
import type {LoginRequest, SignupRequest, AuthState} from "../types/auth";

export function apiLogin(data: LoginRequest){
    return api.post<AuthState>('/auth/log-in', data);
}

export function apiSignup(data: SignupRequest){
    return api.post<AuthState>('/auth/sign-up', data);
}