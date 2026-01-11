package com.mateo.stayora_backend.security;

import com.mateo.stayora_backend.api.enums.UserRole;
import com.mateo.stayora_backend.api.errors.EmailAlreadyExistsException;
import com.mateo.stayora_backend.api.errors.WeakPasswordException;
import com.mateo.stayora_backend.api.model.User;
import com.mateo.stayora_backend.repository.UserRepository;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    private final AuthenticationManager authenticationManager;
    private final JwtTokenService jwtTokenService;
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public AuthService(final AuthenticationManager authenticationManager, final JwtTokenService jwtTokenService, UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.authenticationManager = authenticationManager;
        this.jwtTokenService = jwtTokenService;
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public AuthResponse authenticate(AuthRequest authRequest) {
        var token = new UsernamePasswordAuthenticationToken(authRequest.username(), authRequest.password());
        Authentication authentication = authenticationManager.authenticate(token);

        String jwtToken = jwtTokenService.generateToken(authentication);
        Long expiresAt = jwtTokenService.extractExpirationTime(jwtToken);

        AuthUser authUser = (AuthUser) authentication.getPrincipal();
        User user = authUser.getUser();

        return new AuthResponse(jwtToken, expiresAt,user.getEmail(), user.getFirstName(), user.getLastName(), user.getRole());
    }

    public AuthResponse signup(SignupRequest request) {
        if(userRepository.existsByEmail(request.username())) throw new EmailAlreadyExistsException();

        if(request.password().length() < 8) throw new WeakPasswordException();

        User user = new User(request.firstName(), request.lastName(), request.username(),
                passwordEncoder.encode(request.password()), UserRole.GUEST);

        userRepository.save(user);

        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(request.username(), request.password())
        );

        String jwtToken = jwtTokenService.generateToken(authentication);
        Long expiresAt = jwtTokenService.extractExpirationTime(jwtToken);

        return new AuthResponse(jwtToken, expiresAt, user.getEmail(), user.getFirstName(), user.getLastName(), user.getRole());
    }
}
