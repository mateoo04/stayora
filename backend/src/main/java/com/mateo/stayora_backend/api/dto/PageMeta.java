package com.mateo.stayora_backend.api.dto;

public record PageMeta(
        int page,
        int size,
        long totalElements,
        int totalPages
) {
}
