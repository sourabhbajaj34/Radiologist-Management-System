// Import the apiClient for making API requests
import { apiClient } from './ApiClient';
// Retrieve all todos for a specific username
export const retrieveAllTodosForUsernameApi = 
    (username) => apiClient.get(`/users/${username}/todos`);
// Delete a specific todo by ID for a specific username
export const deleteTodoApi = 
    (username,id) => apiClient.delete(`/users/${username}/todos/${id}`);
// Retrieve a specific todo by ID for a specific username
export const retrieveTodoApi = 
    (username,id) => apiClient.get(`/users/${username}/todos/${id}`);
// Update a specific todo by ID for a specific username
export const updateTodoApi = 
    (username,id,todo) => apiClient.put(`/users/${username}/todos/${id}`,todo); //adding todo as body to update our todo
// Create a new todo for a specific username
export const createTodoApi = 
    (username,todo) =>  apiClient.post(`/users/${username}/todos`,todo);
// Upload a file
export const uploadFile =  
(formData) => apiClient.post('/uploadFile', formData);
                    
// export const uploadDicom = 
//     (formData) => apiClient.post('/upload',formData);