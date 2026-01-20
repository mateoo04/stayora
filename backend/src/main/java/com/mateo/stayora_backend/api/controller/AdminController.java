package com.mateo.stayora_backend.api.controller;

import com.mateo.stayora_backend.api.dto.ChangeRoleRequest;
import com.mateo.stayora_backend.api.dto.ListingDto;
import com.mateo.stayora_backend.api.dto.PageResponse;
import com.mateo.stayora_backend.api.dto.UserDto;
import com.mateo.stayora_backend.api.enums.ListingStatus;
import com.mateo.stayora_backend.api.enums.UserRole;
import com.mateo.stayora_backend.security.AuthUser;
import com.mateo.stayora_backend.security.AuthUserDetailsService;
import com.mateo.stayora_backend.service.AdminService;
import org.springframework.data.domain.Page;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/admin")
@PreAuthorize("hasRole('ADMIN')")
public class AdminController {

    private final AdminService adminService;

    public AdminController(AdminService adminService) {
        this.adminService = adminService;
    }

    @GetMapping("/users")
    public PageResponse<UserDto> searchUsers(@RequestParam(required = false) String query,
                                             @RequestParam(required = false) UserRole role,
                                             @RequestParam(defaultValue = "0") int page,
                                             @RequestParam(defaultValue = "8") int size,
                                             @AuthenticationPrincipal AuthUser me){
        return adminService.searchUsers(query, role, me.getUser().getId(), page, size);
    }

    @PatchMapping("/users/{id}/role")
    public void updateRole(@PathVariable Long id,
                           @RequestBody ChangeRoleRequest request){
        adminService.updateRole(id, request.role());
    }
}
