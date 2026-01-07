package com.mateo.stayora_backend.security;

public record SignupRequest(
        String firstName,
        String lastName,
        String email,
        String password) {
}
