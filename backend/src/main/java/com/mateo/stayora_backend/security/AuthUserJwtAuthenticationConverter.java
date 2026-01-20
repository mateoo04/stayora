package com.mateo.stayora_backend.security;

import com.mateo.stayora_backend.service.UserService;
import org.springframework.core.convert.converter.Converter;
import org.springframework.security.authentication.AbstractAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationToken;

import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

public class AuthUserJwtAuthenticationConverter implements Converter<Jwt, AbstractAuthenticationToken> {

    private final UserService userService;

    public AuthUserJwtAuthenticationConverter(UserService userService) {
        this.userService = userService;
    }

    @Override
    public AbstractAuthenticationToken convert(Jwt jwt) {
        String email = jwt.getSubject();

        var user = userService.findByEmail(email)
                .orElseThrow();

        var authUser = new AuthUser(user);

        var authorities = jwt.getClaimAsString("scope") == null
                ? List.<org.springframework.security.core.GrantedAuthority>of()
                : Arrays.stream(jwt.getClaimAsString("scope").split(" "))
                .filter(s -> !s.isBlank())
                .map(SimpleGrantedAuthority::new)
                .collect(Collectors.toList());

        return new JwtAuthenticationToken(jwt, authorities, authUser.getUsername()) {
            @Override
            public Object getPrincipal() {
                return authUser;
            }
        };
    }
}
