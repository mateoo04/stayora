import type { PageResponse, RoleChangeRequest, UserSearchRequest } from "../types/admin";
import type { Listing, ListingStatus } from "../types/listing";
import type { User, UserRole } from "../types/user";
import { api } from "./client";

export function apiSearchUsers(params: UserSearchRequest) {
    return api.get<PageResponse<User>>('/admin/users', { params });
}

export function apiChangeUserRole(id: number, role: UserRole) {
    return api.patch<void>(`/admin/users/${id}/role`, { role });
}

export function apiUpdateListingStatus(id: number, status: ListingStatus) {
    return api.patch<void>(`/admin/listings/${id}/status`, { status });
}