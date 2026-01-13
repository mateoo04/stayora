package com.mateo.stayora_backend.security;

import com.mateo.stayora_backend.api.enums.UserRole;

public record AuthResponse(
        String token,
        Long expiresAt,
        Long id,
        String email,
        String firstName,
        String lastName,
        UserRole role
) {}
