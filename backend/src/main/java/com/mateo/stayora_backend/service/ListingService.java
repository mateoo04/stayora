package com.mateo.stayora_backend.service;

import com.mateo.stayora_backend.repository.ListingRepository;
import org.springframework.stereotype.Service;

@Service
public class ListingService {

    private final ListingRepository listingRepository;

    public ListingService(ListingRepository listingRepository) {
        this.listingRepository = listingRepository;
    }
}
