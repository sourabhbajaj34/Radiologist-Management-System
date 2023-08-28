package com.in28minutes.rest.webservices.restfulwebservices.todo.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.in28minutes.rest.webservices.restfulwebservices.todo.Todo;

@Repository
public interface TodoRepository extends JpaRepository<Todo, Integer>{

	// creating this method so we can search our DB with help of username(it is not prebuild)
	List<Todo> findByUsername(String username);
	
}
