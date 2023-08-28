import { apiClient } from "./ApiClient"

// This function executes a JWT authentication service using the provided username and password
// It sends a POST request to the '/authenticate' endpoint with the provided credentials
export const excuteJwtAuthentiationService = 
    (username,password) => apiClient.post('/authenticate',{username,password})  
    // Send the provided username and password as the request body