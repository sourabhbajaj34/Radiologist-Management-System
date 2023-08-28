import { useAuth } from "./security/AuthContext"
import { Link, useParams} from 'react-router-dom'
import React, { useEffect, useState } from "react";
import cornerstone from "cornerstone-core";
import cornerstoneMath from "cornerstone-math";
import cornerstoneTools from "cornerstone-tools";
import Hammer from "hammerjs";
import cornerstoneWADOImageLoader from "cornerstone-wado-image-loader";
import dicomParser from "dicom-parser";

//This is essential for the tools provided by Cornerstone to work correctly,
// as they depend on the main Cornerstone library for their functionality.
cornerstoneTools.external.cornerstone = cornerstone;
//Hammer.js is a library that provides touch gesture recognition, which 
//is used by Cornerstone tools to support touch interactions.
cornerstoneTools.external.Hammer = Hammer;
//This line says, "Use this math tool called 'cornerstoneMath' to help with calculations."
cornerstoneTools.external.cornerstoneMath = cornerstoneMath;
//The cornerstoneWADOImageLoader library is responsible for 
//loading and handling WADO (Web Access to DICOM Objects) 
//image data in the Cornerstone library.
cornerstoneWADOImageLoader.external.cornerstone = cornerstone;
// The dicom-parser library provides parsing capabilities for DICOM 
//data, allowing Cornerstone to process and display DICOM images.
cornerstoneWADOImageLoader.external.dicomParser = dicomParser;

function Test(){
   // Get the 'id' parameter from the URL
    const {id} = useParams() // which id to edit
    const ids = parseInt(id)   
    const authContext = useAuth()// Access user authentication context
    const selectedFileArray = authContext.selectedFile
    let selectedFile = null;

    //To search for specifc object using param id

    for (const obj of selectedFileArray) {
      if (obj.id === ids) {
        selectedFile = obj;
        break; // Stop the loop once the object is found
      }
    }

    const metaData= selectedFile.incomingData;
    // Extract metadata from selected file's incomingData
    //Dicom Details
    const patientName = metaData.patientName;
    const patientId = metaData.patientId;
    const age = metaData.age;
    const sex = metaData.sex;
    const uploadDate = metaData.uploadDate
    selectedFile=selectedFile['file'] // Extract the actual file
    // State to store image IDs for rendering
    const [imageIds, setImageIds] = useState([]);
    let element;
    console.log(imageIds);

    useEffect(() => {// Display DICOM image when selectedFile changes
    if (selectedFile) {displayDicom()}}, [selectedFile]);

    const  displayDicom = () => {// Add selected file to the cornerstoneWADOImageLoader file manager
    // `cornerstoneWADOImageLoader` is a library for loading DICOM images from URLs.
    // `selectedFile` represents the selected DICOM file that you want to display.
    // The `cornerstoneWADOImageLoader.wadouri.fileManager.add(selectedFile)` function
    // adds the selected DICOM file to the file manager and returns an image ID.
      const imageIds = cornerstoneWADOImageLoader.wadouri.fileManager.add(selectedFile);
    // `setImageIds` is a function that sets the image IDs to be displayed.
    // In this case, it's setting the image IDs returned from the file manager.
      setImageIds(imageIds);
    // The `cornerstone.loadImage` function is used to load a DICOM image given its image ID.
    // It returns a Promise that resolves to the loaded image.
      cornerstone.loadImage(imageIds).then((image) => {
    // Load and display the image using cornerstone
    // Once the image is loaded, `cornerstone.displayImage` is used to display the image
    // in the specified HTML element (element with the ID "dicomImage").
      cornerstone.displayImage(element, image);
      });
    // Retrieve the HTML element with the ID "dicomImage".
      element = document.getElementById("dicomImage");
    // Enable cornerstone on the element
    // `cornerstone.enable` is used to enable the specified element for interaction with the
    // Cornerstone library. This is necessary for the user to interact with the displayed image.
      cornerstone.enable(element);
    }


  return (
        <div>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              background: "linear-gradient(to right, #87CEEB, #1E90FF)", // Gradient background color
              padding: "20px", // Add some padding for spacing
            }}
          >

            {/* DICOM Image */}
            <div
              id="dicomImage"
              style={{
                backgroundColor: "blue",
                width: "60%", // Adjust the width as needed
                height: "500px", // Adjust the height as needed
                marginRight: "20px", // Add spacing between image and metadata
                borderRadius: "10px", // Add border radius for a rounded look
              }}
            ></div>
            {/* Metadata */}
            <div style={{ width: "40%", color: "#fff" }}>
              <table className="table">
                <tbody>
                <tr>
                    <td colSpan="2" style={{ textAlign: "center" }}>
                      <h3 style={{ fontWeight: "bold" }}>Details</h3>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <h5>Patient Name</h5>
                    </td>
                    <td>{patientName}</td>
                  </tr>
                  <tr>
                    <td>
                      <h5>Patient ID</h5>
                    </td>
                    <td>{patientId}</td>
                  </tr>
                  <tr>
                    <td>
                      <h5>Age</h5>
                    </td>
                    <td>{age}</td>
                  </tr>
                  <tr>
                    <td>
                      <h5>Patient Gender</h5>
                    </td>
                    <td>{sex}</td>
                  </tr>
                  <tr>
                    <td>
                      <h5>Date of Upload</h5>
                    </td>
                    <td>{uploadDate}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div style={{background: "linear-gradient(to right, #87CEEB, #1E90FF)"}}>
                <Link to="/todos" style={{ color: "White",fontWeight: "bold", // Make the text bold
                fontSize: "20px", textDecoration: "none" }}>
                  Back to Todos
                </Link>
          </div>
        </div>
);

}

export default Test;



//The Image ID serves as a way to reference and load a specific DICOM image 
//within the Cornerstone library. It's a string that contains information about 
//how to locate and retrieve the image data. Image IDs are 
//used to manage and interact with DICOM images in the Cornerstone library.