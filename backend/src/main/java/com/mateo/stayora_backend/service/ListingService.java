package com.mateo.stayora_backend.service;

import com.mateo.stayora_backend.api.dto.ListingDto;
import com.mateo.stayora_backend.api.dto.PageMeta;
import com.mateo.stayora_backend.api.dto.PageResponse;
import com.mateo.stayora_backend.api.enums.ListingStatus;
import com.mateo.stayora_backend.api.enums.UserRole;
import com.mateo.stayora_backend.api.model.Listing;
import com.mateo.stayora_backend.api.model.User;
import com.mateo.stayora_backend.repository.ListingRepository;
import com.mateo.stayora_backend.security.AuthUser;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;

@Service
public class ListingService {

    private final ListingRepository listingRepository;

    public ListingService(ListingRepository listingRepository) {
        this.listingRepository = listingRepository;
    }

    public ListingDto createListing(User host, String title, String description, BigDecimal nightPrice, ListingStatus status, String city, String addressLine, double latitude, double longitude){
        Listing listing = new Listing(host, title, description, nightPrice, status, city, addressLine, latitude, longitude);

        listingRepository.save(listing);

        return ListingDto.from(listing);
    }

    public PageResponse<ListingDto> searchListings(String city, ListingStatus status, AuthUser me, int pageNum, int size){
        Pageable pageable = PageRequest.of(pageNum, size);

        Page<Listing> page = (me.getUser().getRole() != UserRole.ADMIN || status == null) ?
                listingRepository.findListingsByCityContainingIgnoreCase(city == null ? "" : city, pageable) :
                listingRepository.findListingsByCityContainingIgnoreCaseAndStatus(city == null ? "" : city, status, pageable);

        return new PageResponse<>(
                page.getContent().stream().map(ListingDto::from).toList(),
                new PageMeta(
                        page.getNumber(),
                        page.getSize(),
                        page.getTotalElements(),
                        page.getTotalPages()
                )
        );
    }
}
