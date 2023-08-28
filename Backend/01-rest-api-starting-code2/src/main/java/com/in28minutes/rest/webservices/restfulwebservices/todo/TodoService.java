package com.in28minutes.rest.webservices.restfulwebservices.todo;
import java.util.ArrayList;
import java.util.List;
import java.util.function.Predicate;

import org.springframework.stereotype.Service;

@Service
public class TodoService {
	
	private static List<Todo> todos = new ArrayList<>();
	
	private static int todosCount = 0;

	 // Retrieve todos by username
	public List<Todo> findByUsername(String username){
		 // Create a predicate to match todos with the provided username
		Predicate<? super Todo> predicate = 
				todo -> todo.getUsername().equalsIgnoreCase(username);
				 // Stream the todo list and filter by the predicate, then convert to a list
		return todos.stream().filter(predicate).toList(); 
		// here we are streamng the todo list and then calling Predicate to
		//check if that todo username is equal to the username which is given to us
	}
	// Add a new radiologist
	//radiologist changes
	public Todo addTodo(Integer id, String radiologistName, Integer contactNo, String emailAddr, String username, String type) 
	// Create a new todo with an auto-incremented ID and provided data
	{
		Todo todo = new Todo(todosCount++,radiologistName,contactNo,emailAddr,username,type);
		todos.add(todo);
		return todo;
	}
	
	public void deleteById(int id) {
		 // Create a predicate to match todos with the provided ID
		Predicate<? super Todo> predicate = todo -> todo.getId() == id;
		todos.removeIf(predicate);
	}

	public Todo findById(int id) {
		  // Create a predicate to match todos with the provided ID
		Predicate<? super Todo> predicate = todo -> todo.getId() == id;
		   // Find the first todo that matches the predicate
		Todo todo = todos.stream().filter(predicate).findFirst().get();
		return todo;
	}

	public void updateTodo(Todo todo) {
		deleteById(todo.getId()); // Delete the existing todo with the same ID
        todos.add(todo); // Add the updated todo to the todos list
	}
}