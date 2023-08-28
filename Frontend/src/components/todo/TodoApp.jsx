import {BrowserRouter, Routes,Route, Navigate} from 'react-router-dom'
import LogoutComponent from './LogoutComponent'
import HeaderComponent from './HeaderComponent'
import WelcomeComponent from './WelcomeComponent'
import ErrorComponent from './ErrorComponent'
import ListTodosComponent from './ListTodosComponent'
import LoginComponent from './LoginComponent'
import AuthProvider, { useAuth } from './security/AuthContext'
import './TodoApp.css'
import { TodoComponent } from './TodoComponent'
import Test from './test'

//Link can only be used if you are part of BrowserRouter
export default function TodoApp(){
   
    function AuthenticatedRoute({children}){
        const authContext = useAuth();
        if(authContext.isAuthenticated){
            return children
        }
       return <Navigate to="/" />
    }


    return (
        <div className="TodoApp">
                <AuthProvider >
                    <BrowserRouter>
                        <HeaderComponent /> {/* Alog with any one Browser Component(login,welcom..) The header and foter compoonent will also be displayed*/}
                            <Routes>
                                <Route path='/' element={<LoginComponent />} />
                                <Route path='/login' element={<LoginComponent />} />

                                <Route path='/welcome/:username' element={
                                    <AuthenticatedRoute>
                                        <WelcomeComponent />
                                    </AuthenticatedRoute>
                                } />
                                <Route path='/todos' element={
                                    <AuthenticatedRoute>
                                        <ListTodosComponent />
                                    </AuthenticatedRoute>
                                
                                } />
                                <Route path='/todo/:id' element={
                                    <AuthenticatedRoute>
                                        <TodoComponent />
                                    </AuthenticatedRoute>
                                
                                } />
                                <Route path='/logout' element={
                                    <AuthenticatedRoute>
                                        <LogoutComponent />
                                    </AuthenticatedRoute>
                                } />

                                <Route path='/test/:id' element={
                                    <AuthenticatedRoute>
                                        <Test />
                                    </AuthenticatedRoute>
                                } 

                                />


                                <Route path='*' element={<ErrorComponent />} />{/*if none of the above routes is accesse it will come here*/}
                            </Routes>
                        
                    </BrowserRouter>
                </AuthProvider>
            
            
        </div>
    )
}










