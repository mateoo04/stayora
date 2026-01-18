import type { PageResponse, UserSearchRequest } from "../types/admin";
import type { User } from "../types/user";
import { api } from "./client";

export function apiSearchUsers(params: UserSearchRequest) {
    return api.get<PageResponse<User>>('/admin/users', { params });
}