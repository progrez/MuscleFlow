import React from "react";
import { Link } from 'react-router-dom';
import LoginForm from "../components/LoginForm";
import Header from "../components/ui/Header";

const LoginScreen = () => {
    return(
        <div className="min-h-screen flex flex-col items-center justify-center bg-neutralDark px-4 text-neutraLight">
            <Header />
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight"> Log In </h2>            
            </div>
            <LoginForm />            
            <p className="mt-10 text-center text-sm/6">
                Don't have an account? <Link to="/register" className="text-primary">Sign Up</Link>
            </p>                
        </div>
        
    )
}

 export default LoginScreen 