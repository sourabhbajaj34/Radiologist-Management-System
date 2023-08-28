package com.in28minutes.rest.webservices.restfulwebservices.todo;


import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;

@Entity
public class Todo {

	public Todo() {
		
	}

	@Id
	@GeneratedValue()
	private Integer id; 
	//Integer: This is a wrapper class for the int primitive type. 
	//It allows you to treat an int as an object and provides additional 
	//methods and functionalities. For example, it can be used in collections, 
	//null values can be assigned to it, and it provides utility methods for 
	//converting between int and String values.

	

	

	public Todo(Integer id, String radiologistName, Integer contactNo, String emailAddr, String username, String type) {
		super();
		this.id = id;
		this.RadiologistName = radiologistName;
		this.ContactNo = contactNo;
		this.EmailAddr = emailAddr;
		this.username = username;
		this.Type = type;
	}

	//private LocalDate targetDate;
	private String RadiologistName;
	private Integer ContactNo;
	private String EmailAddr;
	private String username;
	private String Type;




	public String getRadiologistName() {
		return RadiologistName;
	}

	public void setRadiologistName(String radiologistName) {
		RadiologistName = radiologistName;
	}

	public Integer getContactNo() {
		return ContactNo;
	}

	

	public void setContactNo(Integer contactNo) {
		ContactNo = contactNo;
	}

	public String getEmailAddr() {
		return EmailAddr;
	}

	public void setEmailAddr(String emailAddr) {
		EmailAddr = emailAddr;
	}

	public String getType() {
		return Type;
	}

	public void setType(String type) {
		Type = type;
	}

	@Override
	public String toString() {
		return "Todo [id=" + id + ", RadiologistName=" + RadiologistName + ", ContactNo=" + ContactNo + ", EmailAddr="
				+ EmailAddr + ", Username=" + username + ", Type=" + Type + "]";
	}

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}


	

}