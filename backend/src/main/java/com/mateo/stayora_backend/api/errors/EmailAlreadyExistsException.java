package com.mateo.stayora_backend.api.errors;

public class EmailAlreadyExistsException extends RuntimeException {
    public EmailAlreadyExistsException() {
        super("Email already in use");
    }
}
