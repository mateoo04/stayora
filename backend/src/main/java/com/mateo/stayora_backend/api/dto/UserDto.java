package com.mateo.stayora_backend.api.dto;

import com.mateo.stayora_backend.api.enums.UserRole;
import com.mateo.stayora_backend.api.model.User;

public record UserDto (
    Long id,
    String email,
    String firstName,
    String lastName,
    UserRole role
){
    public static UserDto from(User user){
        return new UserDto(
                user.getId(),
                user.getEmail(),
                user.getFirstName(),
                user.getLastName(),
                user.getRole()
        );
    }
}
