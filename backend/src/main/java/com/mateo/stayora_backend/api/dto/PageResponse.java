package com.mateo.stayora_backend.api.dto;

import java.util.List;

public record PageResponse<T>(
        List<T> content,
        PageMeta page
) {
}
