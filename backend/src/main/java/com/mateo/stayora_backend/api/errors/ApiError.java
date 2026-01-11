package com.mateo.stayora_backend.api.errors;

public record ApiError(
        String code,
        String message
) {
}
