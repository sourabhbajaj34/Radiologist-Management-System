package com.in28minutes.rest.webservices.restfulwebservices.todo;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;

//This class handles REST API endpoints related to todo tasks
public class TodoResource { 

	private TodoService todoService;
	
	// Constructor injection of TodoService
	public TodoResource(TodoService todoService) {
		this.todoService = todoService;
	}
	 // Retrieve all todos for a specific user
	@GetMapping("/users/{username}/todos")
	public List<Todo> retrieveTodos(@PathVariable String username) {
		return todoService.findByUsername(username);
	}
	
	// Retrieve a specific todo by ID for a specific user
	@GetMapping("/users/{username}/todos/{id}")
	public Todo retrieveTodo(@PathVariable String username,@PathVariable int id) {
		return todoService.findById(id);
	}
	
	// Delete a specific todo by ID for a specific user
	@DeleteMapping("/users/{username}/todos/{id}")
	public ResponseEntity<Void>  deleteTodo(@PathVariable String username,@PathVariable int id) {
		 todoService.deleteById(id);
		 return ResponseEntity.noContent().build();
		 
	}
	
	 // Update a specific todo by ID for a specific user
	@PutMapping("/users/{username}/todos/{id}")
	public Todo	 updateTodo(@PathVariable String username,@PathVariable int id,@RequestBody Todo todo) {
		 todoService.updateTodo(todo);
		 return todo;
		 
	}
	
	// Create a new todo for a specific user
	@PostMapping("/users/{username}/todos")
	public Todo createTodo(@PathVariable String username, @RequestBody Todo todo) {
		// Add the provided todo to the todo list
		Todo createdTodo = todoService.addTodo(todo.getId(),todo.getRadiologistName(),todo.getContactNo(),todo.getEmailAddr(),todo.getUsername(),todo.getType());
		return createdTodo;
	}
}
