package com.mateo.stayora_backend.api.errors;

public class WeakPasswordException extends RuntimeException {
    public WeakPasswordException() {
        super("Password must be at least 8 characters.");
    }
}
