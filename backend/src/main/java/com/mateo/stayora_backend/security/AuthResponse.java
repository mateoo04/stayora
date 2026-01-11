package com.mateo.stayora_backend.security;

import com.mateo.stayora_backend.api.enums.UserRole;

public record AuthResponse(
        String token,
        Long expiresAt,
        String username,
        String firstName,
        String lastName,
        UserRole role
) {}
