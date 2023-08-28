import {Link} from 'react-router-dom'
import { useState,useEffect } from 'react';
import { useAuth } from './security/AuthContext';


export default function WelcomeComponent(){
    
    
  // for getting token to send with retrieveHelloWorldPathVariable
  const authContext = useAuth()
  
   
    return(
        <div className="welcome-container">
        <div className="animation-card">
        <h1 className="animation-welcome">Welcome Sourabh</h1>
        <p className="animation-link">
          Manage Your Hospitals: <Link to="/todos">Hospitals Details</Link>
        </p>
      </div>
      </div>

    )
    
}




