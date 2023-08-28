package com.in28minutes.rest.webservices.restfulwebservices.jwt;

import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class JwtAuthenticationController {
    
    private final JwtTokenService tokenService;
    
    private final AuthenticationManager authenticationManager;
 // Constructor injection of JwtTokenService and AuthenticationManager
    public JwtAuthenticationController(JwtTokenService tokenService, 
            AuthenticationManager authenticationManager) {
        this.tokenService = tokenService;
        this.authenticationManager = authenticationManager;
    }
 // Endpoint for generating a JWT token
    @PostMapping("/authenticate")
    public ResponseEntity<JwtTokenResponse> generateToken(
            @RequestBody JwtTokenRequest jwtTokenRequest) {
    	 // Create an authentication token with the provided username and password
        var authenticationToken = 
                new UsernamePasswordAuthenticationToken(
                        jwtTokenRequest.username(), 
                        jwtTokenRequest.password());
        // Perform authentication using the AuthenticationManager
        var authentication = 
                authenticationManager.authenticate(authenticationToken);
        // Generate a JWT token using the JwtTokenService
        var token = tokenService.generateToken(authentication);
        // Return the generated token in the response body
        return ResponseEntity.ok(new JwtTokenResponse(token));
    }
}


