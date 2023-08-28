package com.in28minutes.rest.webservices.restfulwebservices.jwt;

public record JwtTokenResponse(String token) {}


//JwtTokenResponse record is likely used to construct and send the 
//response containing the generated JWT token back to the client. 
//By using a record for this purpose, you simplify the creation of such 
//responses and provide a clear structure for the returned data.
//This helps in maintaining consistency and readability throughout your codebase.