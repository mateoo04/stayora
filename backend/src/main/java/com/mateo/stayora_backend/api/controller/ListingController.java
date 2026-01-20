package com.mateo.stayora_backend.api.controller;

import com.mateo.stayora_backend.api.dto.ListingDto;
import com.mateo.stayora_backend.api.dto.NewListingRequest;
import com.mateo.stayora_backend.api.dto.PageResponse;
import com.mateo.stayora_backend.api.enums.ListingStatus;
import com.mateo.stayora_backend.api.enums.UserRole;
import com.mateo.stayora_backend.security.AuthUser;
import com.mateo.stayora_backend.service.ListingService;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/listings")
public class ListingController {

    private final ListingService listingService;

    public ListingController(ListingService listingService) {
        this.listingService = listingService;
    }

    @PostMapping
    @PreAuthorize("hasAnyRole('HOST','ADMIN')")
    public ListingDto createListing(@RequestBody NewListingRequest request,
                                    @AuthenticationPrincipal AuthUser me) {
        return listingService.createListing(me.getUser(),
                                            request.title(),
                                            request.description(),
                                            request.nightPrice(),
                                            me.getUser().getRole() == UserRole.ADMIN ? ListingStatus.ACTIVE : ListingStatus.DRAFT,
                                            request.city(),
                                            request.addressLine(),
                                            request.latitude(),
                                            request.longitude());
    }

    @GetMapping
    public PageResponse<ListingDto> searchListings(@RequestParam(required = false) String query,
                                                   @RequestParam(required = false) ListingStatus status,
                                                   @RequestParam(defaultValue = "0") int page,
                                                   @RequestParam(defaultValue = "8") int size,
                                                   @AuthenticationPrincipal AuthUser me){
        return listingService.searchListings(query, status, me, page, size);
    }
}
