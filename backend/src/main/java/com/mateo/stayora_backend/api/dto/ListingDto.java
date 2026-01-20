package com.mateo.stayora_backend.api.dto;

import com.mateo.stayora_backend.api.enums.ListingStatus;
import com.mateo.stayora_backend.api.model.Listing;

import java.math.BigDecimal;

public record ListingDto(
        Long id,
        String title,
        String description,
        BigDecimal nightPrice,
        ListingStatus status,
        String city,
        String addressLine,
        double latitude,
        double longitude
        ) {
    public static ListingDto from(Listing l) {
        return new ListingDto(
                l.getId(),
                l.getTitle(),l.getDescription(),
                l.getNightPrice(),
                l.getStatus(),
                l.getCity(),
                l.getAddressLine(),
                l.getLatitude(),
                l.getLongitude()
        );
    }

}
