import { useEffect, useState } from "react";
import { retrieveAllTodosForUsernameApi,uploadFile, deleteTodoApi } from "./api/TodosApiService";
import { useAuth } from "./security/AuthContext";
import { useNavigate } from "react-router-dom";
import  "../../App.css"
//Prime react for table features
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import {FilterMatchMode} from "primereact/api"
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import 'primereact/resources/themes/saga-blue/theme.css'; // Replace with your chosen theme
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import Dexie from 'dexie';

const db = new Dexie('RadioDatabase');
db.version(1).stores({
  files: 'id, data',
});

export default function ListTodosComponent(){
    const authContext = useAuth();
    const username = authContext.username
    const navigate = useNavigate();
    const [todos, setTodos] = useState([])
    const [message, setMessage] = useState(null)
    const selectedFile = authContext.selectedFile;
    const setSelectedFile = authContext.setSelectedFile;
    console.log(message);
    var status = null;

    //Filter prime react
    const [filters, setFilters] = useState({
        global: {value: null, matchMode: FilterMatchMode.CONTAINS},
    })

    //File upload
    
    useEffect(
        () => refreshTodos(),[] // empty list indicates it will render only once the page is refereshed
    ) //The useEffect Hook allows you to perform side effects in your components.
                //Some examples of side effects are: fetching data, directly updating the DOM, and timers.


    // Function to load selected file from the chrome database
    async function loadSelectedFile() {
        const files = await db.files.toArray();
        const transformedFiles = files.map(file => ({
            ...file.data,
            id: file.data.todoId // Duplicate the id property at the top level
          }));
        await setSelectedFile(transformedFiles);
    }
            
    //retrieving information from backend
    function refreshTodos(){
        loadSelectedFile()

        retrieveAllTodosForUsernameApi(username)
        .then(response => {
            setTodos(response.data) //we set details setTodos
        })
        .catch(error => console.log(error))

    }
        
    function deleteTodo(rowData){ // to delete a specific todo with id
        deleteTodoApi(username,rowData.id)
        .then(

            () => {
                 //1. Diaplay message
                setMessage(`Delete of todo ${rowData.id} successful`)
                //2. Update todo list
                 refreshTodos()
            }
        )
        .catch(error => console.log(error))
    }
    //    function updateTodoStatus(rowData , status){  //to change the status of a specific todo with id
    function updateTodo(id){
        navigate(`/todo/${id}`)
    }

    function addNewTodo(){
        navigate(`/todo/-1`); // here id as -1 so Todo component will know its to add
    }

     //function to navigate yo /test
    function viewDicom(id){
        navigate(`/test/${id}`)
    }

    //prime react 
    const actionTemplate = (rowData) => {
        return (
          <Button icon="pi pi-trash" onClick={() => deleteTodo(rowData)} className="p-button-danger" />
        );
    };

    const inputTemplate = (rowData) => {
        return (
            <Button icon="pi pi-file-edit" onClick={() => updateTodo(rowData.id)} />
          );
    };

    //handle delete dicom function sourabh 
    const handleDeleteDicom = async (todoId) => {
            await db.files.delete(todoId);
            await loadSelectedFile()
    };
      
    //to check the status of Dicom file
    const statusTemplate = (rowData)=>{
          // Find the index of the selectedFile item that matches the current rowData id
        const indexToUpdate = selectedFile.findIndex(item => item.todoId === rowData.id);
         // Initialize variables for displaying status and filename
        var fileName = null;
        var slicedFilename = null;
        // Check if the selectedFile item was found in the array (index is not -1)
        if (indexToUpdate !== -1) { // if present
            status=true // Set status to true, indicating the file is present
            fileName = selectedFile[indexToUpdate].file.name // Get the filename
            slicedFilename = fileName.slice(0,5)  // Extract the first 5 characters of the filename
        } else {
            status=false // Set status to false, indicating the file is not present
        }
        //to position the eye symbol in center
        const buttonStyles = {
            padding: '0px 0px 0px 0px',
          };      

        return(
            <div>
                <button className={`btn  btn-circle ${status ? 'btn-success bi bi-eye' : 'btn-danger'}`} 
                        style={buttonStyles} disabled={!status}
                        onClick={() => viewDicom(rowData.id)}>
                            {status ? '👁' : ''}
                </button>
                {status ? <p>{slicedFilename}...</p> : ''}   

                 {/* //sourabh new code for deleting */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    {rowData.status}
                <Button
                    icon="pi pi-times"
                    style={{ marginTop: '2px',backgroundColor: 'white', borderColor: 'transparent' }}
                    className="p-button-rounded p-button-danger p-button-outlined p-button-sm" disabled={!status}
                    onClick={() => handleDeleteDicom(rowData.id)}
                    >
                 </Button>
                </div>      
            </div>

            
        )
        
    }
    // to upload dicom file
    const fileUploadTemplate = (rowData) => {
        const handleFileChange = async (event) => {
        // Create a FormData object to prepare data for file upload
       //send it to backend to get the metadata
       const formData = new FormData();
       formData.append('dicomFile', event.target.files[0]);
       formData.append('hospitalId', rowData.id);
        // Initialize a variable to store incoming metadata
       var incomingMetaData = null;
       // Send the file data to the backend for processing
       await uploadFile(formData)
       .then((response) => {
           incomingMetaData = response.data
        }).catch(err => console.log(err))
        // Create a temporary object to store file information and metadata
       const temp = {todoId:rowData.id, 
                        file:event.target.files[0],
                        incomingData:incomingMetaData
                    };
// Find the index of the file entry in selectedFile array, if present
       const indexToUpdate = selectedFile.findIndex(item => item.todoId === temp.todoId);
       if (indexToUpdate !== -1) {// if the file entry already exists
           // Create a new file entry object
           const fileEntry = { data: temp};
           // Update the file entry in the database and refresh selectedFile
           await db.files.update(temp.todoId, fileEntry);
           await loadSelectedFile();
       } else {// if the file entry doesn't exist
        // Create a new file entry object with an additional 'id' property
        const fileEntry = { data: temp, id:rowData.id};
        // Add the new file entry to the database and refresh selectedFile
        await db.files.add(fileEntry);
        await loadSelectedFile();
       }
   };
   
 // Return an input element for file upload, invoking handleFileChange on change
   return (
       <input type="file" onChange={handleFileChange} accept=".dcm" />
   );
    };

return(   
      //  Prime react table:
        <div className="container" >
            <InputText 
                onInput={(e) =>
                    setFilters({
                        global: {value:e.target.value, matchMode:FilterMatchMode.CONTAINS},
                    })
                }
            />
            <DataTable value={todos} sortMode="multiple" filters={filters} paginator rows={5} rowsPerPageOptions={[1,2,3,4,5,6]}>
                <Column field="id" header="ID" sortable/>
                <Column field="radiologistName" header="Radiologist Name" sortable/>
                <Column field="contactNo" header="Contact Number" sortable/>
                <Column field="emailAddr" header="Email Address" sortable />
                <Column field="username" header="username" sortable/>
                <Column field="type" header="type" sortable/>
                <Column body={actionTemplate} header="Delete" style={{ textAlign: 'center' }} />
                <Column body={inputTemplate} header="Update" style={{ textAlign: 'center' }} />
                <Column body={fileUploadTemplate} header="Upload File" style={{ textAlign: 'center' }} ><Button /></Column>
                <Column body={statusTemplate} header="Status" style={{ textAlign: 'center' }} />
            </DataTable>

            <div className="">
                     <button className="btn btn-success m-5" onClick={addNewTodo}>Add new Radiologist</button>
             </div>
        </div>
    )
}
