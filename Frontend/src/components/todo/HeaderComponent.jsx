import {Link} from 'react-router-dom'
import { useAuth } from './security/AuthContext'
export default function HeaderComponent(){


    const authContext = useAuth();
    const isAuthenticated = authContext.isAuthenticated;
   

    function logout(){ // if the user clicks the logout button this function will be called anf the value of isAuthenticated becomes false
        authContext.logout() // login in context
    }
    

    return(
            
        // 
        <header className="mb-0 p-2" style={{ background: 'linear-gradient(to right, #87CEEB, #1E90FF)', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)' }}>
  {/* Bootstrap */}
  <div className="container">
    <div className="row">
      <nav className="navbar navbar-expand-lg">
        <a className="navbar-brand ms-2 fs-2 fw-bold text-white" href="https://www.deeptek.ai/">Deeptek</a>
        <div className="collapse navbar-collapse">
          <ul className="navbar-nav">
            <li className="nav-item fs-5">
              {isAuthenticated && <Link className="nav-link text-white" to="/welcome/shree">Home</Link>} {/* if and only if the value of isAuthenticated the features will be available */}
            </li>
            <li className="nav-item fs-5">
              {isAuthenticated && <Link className="nav-link text-white" to="/todos">Hospitals</Link>}
            </li>
          </ul>
        </div>
        <ul className="navbar-nav">
          <li className="nav-item fs-5">
            {!isAuthenticated && <Link className="nav-link text-white" to="/login">Login</Link>}
          </li>
          <li className="nav-item fs-5">
            {isAuthenticated && <Link className="nav-link text-white" to="/logout" onClick={logout}>Logout</Link>}
          </li>
        </ul>
      </nav>
    </div>
  </div>
</header>

    )
}
