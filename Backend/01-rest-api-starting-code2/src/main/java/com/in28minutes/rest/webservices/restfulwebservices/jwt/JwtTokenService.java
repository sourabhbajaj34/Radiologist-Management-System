package com.in28minutes.rest.webservices.restfulwebservices.jwt;

import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.stream.Collectors;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.oauth2.jwt.JwtClaimsSet;
import org.springframework.security.oauth2.jwt.JwtEncoder;
import org.springframework.security.oauth2.jwt.JwtEncoderParameters;
import org.springframework.stereotype.Service;

@Service
public class JwtTokenService {
    
    private final JwtEncoder jwtEncoder;
    // Constructor injection of JwtEncoder
    public JwtTokenService(JwtEncoder jwtEncoder) {
        this.jwtEncoder = jwtEncoder;
    }

    // Generates a JWT token based on the provided authentication
    public String generateToken(Authentication authentication) {
 // Extract authorities (scopes) from the authentication and join them into a space-separated string
        var scope = authentication
                        .getAuthorities()
                        .stream()
                        .map(GrantedAuthority::getAuthority)
                        .collect(Collectors.joining(" "));
     // Build JWT claims with issuer, issuedAt, expiration, subject, and scope
        var claims = JwtClaimsSet.builder()
        		.issuer("self") // Set issuer as "self"
                .issuedAt(Instant.now()) // Set issuance time to current time
                .expiresAt(Instant.now().plus(90, ChronoUnit.MINUTES)) // Set expiration time to 90 minutes from now
                .subject(authentication.getName()) // Set subject (user's identifier)
                .claim("scope", scope) // Set custom claim for scope
                .build();
     // Encode the JWT claims into a JWT token using JwtEncoder
        return this.jwtEncoder
                .encode(JwtEncoderParameters.from(claims))
                .getTokenValue();
    }
}


