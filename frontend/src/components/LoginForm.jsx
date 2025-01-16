import React, {useState} from "react";
import Input from "./ui/Input";
import Button from "./ui/Button";

const LoginForm = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
      });

    const [errors, setErrors] = useState({
        email: '',
        password: ''
    });

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

    const handleSubmit = (e) => {
        e.preventDefault();

        if (validateForm()) {            
            console.log('Form submitted:', formData);
            // API call
        }

    }

    return (
        <form onSubmit={handleSubmit}>            
            <Input label="Email" type="email" name="email" value={formData.email} onChange={handleChange} error={errors.email}/>
            <Input label="Password" type="password" name="password" value={formData.password} onChange={handleChange} error={errors.password}/>            
            <Button type="submit" label="Log in"/>
        </form>
    )
}

export default LoginForm