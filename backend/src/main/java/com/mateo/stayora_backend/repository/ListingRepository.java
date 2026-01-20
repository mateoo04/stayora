package com.mateo.stayora_backend.repository;

import com.mateo.stayora_backend.api.enums.ListingStatus;
import com.mateo.stayora_backend.api.model.Listing;
import org.springframework.data.domain.Limit;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ListingRepository extends JpaRepository<Listing, Long> {
    Page<Listing> findListingsByCityContainingIgnoreCaseAndStatus(String city, ListingStatus status, Pageable pageable);
    Page<Listing> findListingsByCityContainingIgnoreCase(String city, Pageable pageable);
}
