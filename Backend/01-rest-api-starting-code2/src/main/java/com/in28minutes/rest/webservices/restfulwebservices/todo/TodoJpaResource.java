package com.in28minutes.rest.webservices.restfulwebservices.todo;


import java.util.List;

import org.dcm4che3.data.Attributes;
import org.dcm4che3.io.DicomInputStream;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.in28minutes.rest.webservices.restfulwebservices.todo.repository.TodoRepository;

@RestController
public class TodoJpaResource { 

	private TodoService todoService;
	
	private TodoRepository todoRepository;
	
	
	public TodoJpaResource(TodoService todoService,TodoRepository todoRepository) {
		this.todoService = todoService;
		this.todoRepository = todoRepository;
	}
	
	@GetMapping("/users/{username}/todos")
	public List<Todo> retrieveTodos(@PathVariable String username) {
		return todoRepository.findByUsername(username); 
		// searching our DB for list of radiologists with help of username
	}
	
	@GetMapping("/users/{username}/todos/{id}")
	public Todo retrieveTodo(@PathVariable String username,@PathVariable int id) {
		return todoRepository.findById(id).get(); 
		// we are putting get becaues it returns the optional
	}
	
	@DeleteMapping("/users/{username}/todos/{id}")
	public ResponseEntity<Void>  deleteTodo(@PathVariable String username,@PathVariable int id) {
		todoRepository.deleteById(id);
		return ResponseEntity.noContent().build();
		 
	}
	@PutMapping("/users/{username}/todos/{id}")
	public Todo	 updateTodo(@PathVariable String username,@PathVariable int id,@RequestBody Todo todo) {
		todoRepository.save(todo); 
		// here save checks if the id is null it will create new Todo but if it exists it will update
		 return todo;
		 
	}
	@PostMapping("/users/{username}/todos")
	public Todo createTodo(@PathVariable String username, @RequestBody Todo todo) {
		todo.setUsername(username);
		todo.setId(null); // setting id as null so our repo knows that it is to be added not updated
		return todoRepository.save(todo);	
		//return todo;
	}
	
		//private static AttributeList list = new AttributeList();
		@PostMapping("/uploadFile")
	    public ExtractedInfo uploadFile(@RequestParam("dicomFile") MultipartFile dicomFile, @RequestParam("hospitalId") Integer hospitalId) {
			// Create an instance of ExtractedInfo to store the extracted DICOM attributes
			ExtractedInfo extractedInfo = new ExtractedInfo();
			

			 try {
				  	// Create a DicomInputStream to read the DICOM file content
		            DicomInputStream dis = new DicomInputStream(dicomFile.getInputStream());
		            // Read the attributes from the DICOM dataset
		            Attributes attrs = dis.readDataset(-1);
		            // Print and set the extracted PatientName attribute
		            System.out.println(attrs.getString(org.dcm4che3.data.Tag.PatientName));
		            // Process the extracted attributes as needed
		            // For example:
		            // Set the extracted attributes to the ExtractedInfo instance
		            extractedInfo.setPatientName(attrs.getString(org.dcm4che3.data.Tag.PatientName));
		            extractedInfo.setPatientId(attrs.getString(org.dcm4che3.data.Tag.PatientID));
		            extractedInfo.setAge(attrs.getString(org.dcm4che3.data.Tag.PatientAge));
		            extractedInfo.setSex(attrs.getString(org.dcm4che3.data.Tag.PatientSex));
		            extractedInfo.setUploadDate(attrs.getString(org.dcm4che3.data.Tag.StudyDate));
		            // Close the DicomInputStream
		            dis.close();
		        } catch (Exception e) {
		        	// Print the stack trace if an exception occurs during processing
		            e.printStackTrace();
		        }

		        return extractedInfo;
			
	    }

		
	}
	

