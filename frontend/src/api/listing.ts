import type { PageResponse } from "../types/admin";
import type { Listing, ListingSearchRequest } from "../types/listing";
import { api } from "./client";

export function apiSearchListings(params: ListingSearchRequest){
    return api.get<PageResponse<Listing>>('/listings', { params });
}