package com.in28minutes.rest.webservices.restfulwebservices.jwt;

public record JwtTokenRequest(String username, String password) {}

//JwtTokenRequest record is used to conveniently pass the username and password when 
//requesting a JWT token through the JwtAuthenticationController's generateToken() method. 
//This structure simplifies the 
//token generation process by providing a clear and concise way to package the required data.
