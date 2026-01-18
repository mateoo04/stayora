package com.mateo.stayora_backend.api.dto;

import com.mateo.stayora_backend.api.enums.UserRole;
import jakarta.validation.constraints.NotNull;

public record ChangeRoleRequest(
        @NotNull UserRole role
        ) {
}
