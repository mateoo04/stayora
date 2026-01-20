package com.mateo.stayora_backend.api.dto;

import jakarta.validation.constraints.NotNull;

import java.math.BigDecimal;

public record NewListingRequest(
        @NotNull String title,
        @NotNull String description,
        @NotNull BigDecimal nightPrice,
        @NotNull String city,
        @NotNull String addressLine,
        @NotNull double latitude,
        @NotNull double longitude
) {
}
