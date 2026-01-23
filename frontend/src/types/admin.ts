import type { UserRole } from "./user";

export interface PageMeta{
    page: number;
    size: number;
    totalElements: number;
    totalPages: number;
}

export interface PageResponse<T>{
    content: T[];
    meta: PageMeta;
}

export interface UserSearchRequest{
    query: string;
    role: UserRole | null;
    page: number;
    size: number;
}