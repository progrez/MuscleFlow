import React, {useState} from "react";
import { useNavigate } from "react-router-dom";
import Input from "./ui/Input";
import Button from "./ui/Button";
import auth from "../utils/auth";

const backendURL = import.meta.env.VITE_BACKEND_URL;

const LoginForm = () => {
    const navigate = useNavigate()

    const INITIAL_FORM_STATE = {
        email: '',
        password: ''
    }

    const [formData, setFormData] = useState(INITIAL_FORM_STATE);

    const [errors, setErrors] = useState({});

    const resetForm = () => {
        setFormData(INITIAL_FORM_STATE);
        setErrors({});
    };

    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;

        setFormData(previousState => {
            const newState = {
              email: previousState.email,    
              password: previousState.password
            };
            
            // Update just the field that changed
            if (name === 'email') {
              newState.email = value;

              // Clear email error
              setErrors({
                email: '',
                password: errors.password
            });
            }
            if (name === 'password') {
              newState.password = value;

              //Clear password error
              setErrors({
                email: errors.email,
                password: ''
              })
            }
            
            return newState;
        });
    };

    const validateForm = () => {
        const newErrors = {
            email: '',
            password: ''
        };
        
        // Email validation
        if (!formData.email) {
            newErrors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Please enter a valid email';
        }

        // Password validation
        if (!formData.password) {
            newErrors.password = 'Password is required';
        } 
        if (formData.password.length < 6) {
            newErrors.password = 'Password must be at least 6 characters';
        }

        setErrors(newErrors);
        
        // Return true if there are no errors
        return !newErrors.email && !newErrors.password;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (validateForm()) {            
            try{
                const response = await fetch (`${backendURL}/api/login`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',                    
                        'Authorization': `Bearer ${auth.getToken()}`
                    },
                    body: JSON.stringify({
                        email: formData.email,
                        password: formData.password
                    })
                })

                if (response.ok) {
                    const result = await response.json();                                        
                    auth.storeToken(result.token)                                        
                    resetForm();
                    navigate('/dashboard'); 
                }

            } catch(error) {
                console.error('Network error:', error);                
            }
        }
    else {
            console.log('User info is not valid')
        }
    }

    return (
        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <form onSubmit={handleSubmit}>            
                <Input label="Email" type="email" name="email" value={formData.email} onChange={handleChange} error={errors.email}/>
                <Input label="Password" type="password" name="password" value={formData.password} onChange={handleChange} error={errors.password}/>            
                <Button type="submit" label="Log in"/>
            </form>
        </div>
    )
}

export default LoginForm