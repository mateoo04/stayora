import type { User } from "./user";

export interface AuthState extends User {
  token: string;
  expiresAt: number;
}

export interface LoginRequest {
  username: string;
  password: string;
}

export interface SignupRequest {
  firstName: string;
  lastName: string;
  username: string;
  password: string;
}