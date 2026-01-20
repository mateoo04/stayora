export type ListingStatus = "DRAFT" | "ACTIVE" | "PAUSED";

export const LISTING_STATUSES: ListingStatus[] = ["DRAFT", "ACTIVE", "PAUSED"];

export interface Listing{
    id: number;
    title: string;
    description: string;
    nightPrice: number;
    status: ListingStatus;
    city: string;
    addressLine: string;
    latitude: number;
    longitude: number;
}

export interface ListingSearchRequest{
    query: string;
    status: ListingStatus | null;
    page: number;
    size: number;
}