package com.mateo.stayora_backend.api.dto;

import com.mateo.stayora_backend.api.enums.UserRole;

public record UserDto (
    Long id,
    String email,
    String firstName,
    String lastName,
    UserRole role
){}
