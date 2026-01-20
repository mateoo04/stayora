import type { PageResponse, RoleChangeRequest, UserSearchRequest } from "../types/admin";
import type { User } from "../types/user";
import { api } from "./client";

export function apiSearchUsers(params: UserSearchRequest) {
    return api.get<PageResponse<User>>('/admin/users', { params });
}

export function apiChangeUserRole(params: RoleChangeRequest) {
    return api.patch<void>(`/admin/users/${params.id}/role`, { role: params.role });
}