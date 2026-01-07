package com.mateo.stayora_backend.security;

public record AuthResponse(
        String token,
        String username,
        Long expiresAt
) {}
