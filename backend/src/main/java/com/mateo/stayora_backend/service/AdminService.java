package com.mateo.stayora_backend.service;

import com.mateo.stayora_backend.api.dto.PageMeta;
import com.mateo.stayora_backend.api.dto.PageResponse;
import com.mateo.stayora_backend.api.dto.UserDto;
import com.mateo.stayora_backend.api.enums.ListingStatus;
import com.mateo.stayora_backend.api.enums.UserRole;
import com.mateo.stayora_backend.api.model.User;
import com.mateo.stayora_backend.repository.ListingRepository;
import com.mateo.stayora_backend.repository.UserRepository;
import jakarta.transaction.Transactional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.List;

@Service
public class AdminService {

    private final UserRepository userRepository;
    private final ListingRepository listingRepository;

    public AdminService(UserRepository userRepository, ListingRepository listingRepository) {
        this.userRepository = userRepository;
        this.listingRepository = listingRepository;
    }

    public PageResponse<UserDto> searchUsers(String email, UserRole role, Long idToExclude, int pageNum, int size) {
        Pageable pageable = PageRequest.of(pageNum, size);

        Page<User> page;

        if (email != null && role != null) {
            page = userRepository.findByEmailContainingAndRoleAndIdNot(email, role, idToExclude, pageable);
        } else if (email != null) {
            page = userRepository.findByEmailContainingAndIdNot(email, idToExclude, pageable);
        } else if (role != null) {
            page = userRepository.findByRoleAndIdNot(role, idToExclude, pageable);
        } else {
            page = userRepository.findByIdNot(idToExclude, pageable);
        }

        return new PageResponse<>(
                page.getContent().stream().map(UserDto::from).toList(),
                new PageMeta(
                        page.getNumber(),
                        page.getSize(),
                        page.getTotalElements(),
                        page.getTotalPages()
                )
        );
    }

    @Transactional
    public void updateRole(Long userId, UserRole role){
        userRepository.updateRoleById(userId, role);
    }

    @Transactional
    public void updateStatus(Long listingId, ListingStatus status){
        listingRepository.updateStatusById(listingId, status);
    }
}
