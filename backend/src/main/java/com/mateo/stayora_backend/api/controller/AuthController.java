package com.mateo.stayora_backend.api.controller;

import com.mateo.stayora_backend.api.dto.UserDto;
import com.mateo.stayora_backend.api.model.User;
import com.mateo.stayora_backend.security.*;
import jakarta.validation.Valid;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/log-in")
    public AuthResponse login(@RequestBody AuthRequest authRequest) {
        return authService.authenticate(authRequest);
    }

    @PostMapping("/sign-up")
    public AuthResponse signUp(@Valid @RequestBody SignupRequest request) {
        return authService.signup(request);
    }

    @GetMapping("/me")
    public UserDto me(Authentication authentication) {
        return authService.getCurrentUser(authentication);
    }
}
