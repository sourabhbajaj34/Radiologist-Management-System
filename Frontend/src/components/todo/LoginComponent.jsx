import { useState } from 'react'
import {useNavigate} from 'react-router-dom'
import { useAuth } from './security/AuthContext';

export default function LoginComponent(){
    const navigate = useNavigate(); // for navigating from one comp to another
    const [username, setUserName] = useState('') // for username
    const [password, setPassword] = useState('') // for password
    const[loginMessage, setLoginMessage] = useState('')
    const [isValid, setIsValid] = useState(false); // to check if password contains all the constraints
    const [errors, setErrors] = useState([]); // to display that any constraints is missing
    const authContext = useAuth();

    const [buttonClicked,setButtonClicked] = useState(false)


    function handleUsernameChange(event){
          setUserName(event.target.value) 
    }

    function handlePasswordChange(event){
        const newPassword = event.target.value; // getting value of password from event
        const isValidPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*()_+])(?=.{8,})/.test(newPassword);
        setPassword(newPassword);
        setIsValid(isValidPassword);

        const newErrors = [];
        if (newPassword.length < 8) {
            newErrors.push('Password must be at least 8 characters long');
          }

        if (!/(?=.*[a-z])/.test(newPassword)) {
        newErrors.push('Lowercase letter is missing');
        }

        if (!/(?=.*[A-Z])/.test(newPassword)) {
        newErrors.push('Uppercase letter is missing');
        }

        if (!/(?=.*[0-9])/.test(newPassword)) {
        newErrors.push('Number is missing');
        }

        if (!/(?=.*[!@#$%^&*()_+])/.test(newPassword)) {
        newErrors.push('Special character is missing');
        }

        setErrors(newErrors);
        
    }

    async function handleLoginMessage(event){ // since the login function in AuthContext is also asyn this should also be async
        if(await authContext.login(username,password)){ // login fun is in  context to make our code maintable and await for the response
            navigate(`/welcome/${username}`);// if login success the navigate to welcome comp
            
        }else{
            setLoginMessage("Failure");
        }
        setButtonClicked(true);
    }
    return(
        <div className="login-container">
        <div className="login-card">
        <h1 className="login-heading">Login Please</h1>
        <div className={`successMessage ${isValid ? 'success' : 'error'}`}>
          {loginMessage}
        </div>
        {buttonClicked&& !isValid && (
          <div className="errorContainer">
            <p className="error-text">The following criteria are not met:</p>
            <ul className="error-list">
              {errors.map((error, index) => (
                <li key={index} className="error-item">
                  {error}
                </li>
              ))}
            </ul>
          </div>
        )}
        <div className="login-form">
          <div className="form-group">
            <label htmlFor="username">User Name</label>
            <input
              type="text"
              id="username"
              name="username"
              value={username}
              onChange={handleUsernameChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={handlePasswordChange}
            />
          </div>
          <div className="form-group">
            <button className="login-button" type="button" onClick={handleLoginMessage}>
              Login
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}