package com.mateo.stayora_backend.api.dto;

import com.mateo.stayora_backend.api.enums.ListingStatus;
import jakarta.validation.constraints.NotNull;

public record ChangeListingStatus(
        @NotNull ListingStatus status
        ) {
}
