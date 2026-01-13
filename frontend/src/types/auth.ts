export type UserRole = "ADMIN" | "HOST" | "GUEST";

export interface AuthState {
  token: string;
  expiresAt: number;
  id: number;
  username: string;
  firstName: string;
  lastName: string;
  role: UserRole;
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