package com.mateo.stayora_backend.api.controller;

import com.mateo.stayora_backend.security.AuthRequest;
import com.mateo.stayora_backend.security.AuthResponse;
import com.mateo.stayora_backend.security.AuthService;
import com.mateo.stayora_backend.security.SignupRequest;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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
    public AuthResponse signUp(@RequestBody SignupRequest request) {
        return authService.signup(request);
    }
}
