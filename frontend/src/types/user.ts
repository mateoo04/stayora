export type UserRole = "ADMIN" | "HOST" | "GUEST";

export const USER_ROLES: UserRole[] = ["ADMIN", "HOST", "GUEST"];

export interface User{
    id: number;
    email: string;
    firstName: string;
    lastName: string;
    role: UserRole
}