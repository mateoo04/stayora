package com.mateo.stayora_backend.security;

public record AuthRequest(
        String username,
        String password
) {}

