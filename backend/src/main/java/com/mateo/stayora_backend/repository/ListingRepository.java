package com.mateo.stayora_backend.repository;

import com.mateo.stayora_backend.api.model.Listing;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ListingRepository extends JpaRepository<Listing, Long> {
}
