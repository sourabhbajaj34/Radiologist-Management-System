import { useAuth } from "./security/AuthContext"
import {useNavigate, useParams} from 'react-router-dom'
import { createTodoApi, retrieveTodoApi, updateTodoApi } from "./api/TodosApiService"
import { useEffect, useState } from "react"
import {ErrorMessage, Field, Form, Formik} from 'formik' // used for form programming
// import * as Yup from 'yup'; // used for datavalidation
//radiologist

// const validationSchema = Yup.object().shape({
//     radiologistName: Yup.string().required('Radiologit Name is required'),
//     contactNo: Yup.string().required('Contact Number is required').matches(/^\d{10}$/, 'Contact Number must be exactly 10 digit number'),
//     emailAddr: Yup.string().email('Invalid email').required('Email is required'),
//     type: Yup.string().required('Type is required').matches(/^\d{10}$/, 'Enter a Valid Type'),
//   });
export function TodoComponent(){

    const {id} = useParams() // which id to edit
    const navigate = useNavigate();
    const[radiologistName,setRadiologistName] = useState('')
    const[contactNo,setContactNumber] = useState('')
    const[emailAddr,setEmailAddress] = useState('')
    const[type,setType] = useState('')
    const authContext = useAuth()
    const username = authContext.username

    useEffect(// will come into effect when the page is loaded and retrieveTodo is called
        () => retrieveHospitalInfo, [id] )

    function retrieveHospitalInfo(){
        if(id !== -1){ // checkiing if we have to update the Todo or create a new one
            retrieveTodoApi(username, id) // calling backend for fteching todo for a specific id
            .then(response => {
            setRadiologistName(response.data.radiologistName)
            setContactNumber(response.data.contactNo)
            setEmailAddress(response.data.emailAddr)
            setType(response.data.type)
            })
            .catch(error => console.log(error))
        }
        
    }

    function onsubmit(values){ // values will hold the updated fields of desc and date
        const todo = {
            id,
            username,
            // extracting from values
            radiologistName:values.radiologistName,
            contactNo : values.contactNo,
            emailAddr  : values.emailAddr,
            type:values.type
            
            
        }
        if (id === "-1") { // to add new todo
            createTodoApi(username, todo)
              .then(response => {
                console.log("Response from backend:");
                console.log(response);
                navigate('/todos');
              })
              .catch(error => console.log(error));
          } else { // to update existing todo
            updateTodoApi(username, id, todo) // Use the existing 'id' for updating
              .then(response => {
                console.log("Response after updating:");
                console.log(response);
                navigate('/todos'); // once the Todo is updated, it will be redirected to /todos
              })
              .catch(error => console.log(error));
          }
        
       
    }

   

    return(
        <div className="container" style={{  background: 'linear-gradient(to right, #87CEEB, #1E90FF)' }}>
            <h1>Enter Todo Details</h1>
            <div>
               <Formik initialValues={{radiologistName,contactNo,emailAddr,type}}
                enableReinitialize={true} //By default Formik does not reinitialize the values we hav to config it 
                onSubmit={onsubmit}
                validationSchema={validationSchema}
                // validateOnChange ={false} // will validate only if we click save
                // validateOnBlur={false}
               >  
                {
                    (props) => (
                        <Form> {/* Formik element */}

                            <ErrorMessage 
                                name="description"
                                component="div"
                                className="alert alert-warning"
                            /> {/* Formik element for showing any error */}

                            <ErrorMessage 
                                name="targetDate"
                                component="div"
                                className="alert alert-warning"
                            /> {/* Formik element for showing any error */}               
                            
                            <fieldset className="form-group">
                                <label>Radiologist Name</label>
                                <Field type="text" className="form-control" name="radiologistName"/> {/* Formik element */}
                                <ErrorMessage name="radiologistName" component="div" className="error" />
                            </fieldset>

                            <fieldset className="form-group">
                                <label>Contact Number</label>
                                <Field type="number" className="form-control" name="contactNo"/> {/* Formik element */}
                                <ErrorMessage name="contactNo" component="div" className="error" />
                            </fieldset>
                            <fieldset className="form-group">
                                <label>Email Addess</label>
                                <Field type="email" className="form-control" name="emailAddr"/> {/* Formik element */}
                                <ErrorMessage name="emailAddr" component="div" className="error" />
                            </fieldset>
                           

                            <fieldset className="form-group">
                                <label>Type</label>
                                <Field type="text" className="form-control" name="type"/> {/* Formik element */}
                                <ErrorMessage name="type" component="div" className="error" />
                            </fieldset>
                            <div>
                                <button className="btn btn-success m-5" type="submit">Save</button>
                            </div>
                        </Form>
                    )
                }
               </Formik>
            </div>
        </div>
    )
}
