import React, {useState} from "react";
import auth from '../utils/auth.js'
import Input from "./ui/Input";
import Button from "./ui/Button";



const backendURL = import.meta.env.VITE_BACKEND_URL;

const RegistrationForm = () => {
    const INITIAL_FORM_STATE = {
        username: '',
        email: '',
        password: '',
        d_o_b: '',
        weight: '',
        height: '',
        gender: ''
    };

    const [formData, setFormData] = useState(INITIAL_FORM_STATE);

    const [errors, setErrors] = useState({})

    const [currentStep, setCurrentStep] = useState(1);

    const resetForm = () => {
        setFormData(INITIAL_FORM_STATE);
        setErrors({});
    };
    
    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
    
        // Update all form data at once
        setFormData({
            ...formData,
            [name]: value
        });
    
        // Clear error for the changed field
        setErrors({
            ...errors,
            [name]: ''
        });
    };

    const validateForm = () => {
        const newErrors = {};

        // Username validation
        if (!formData.username.trim()) {
            newErrors.username = 'Username is required';
        } else if (formData.username.length < 3) {
            newErrors.username = 'Username must be at least 3 characters';
        }

        // Email validation
        if (!formData.email) {
            newErrors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Please enter a valid email address';
        }

        // Password validation
        if (!formData.password) {
            newErrors.password = 'Password is required';
        } else if (formData.password.length < 6) {
            newErrors.password = 'Password must be at least 6 characters';
        }

        // Update the errors state with any validation errors
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    }; 


    const handleSubmitStep1 = async (e) => {
        e.preventDefault()
        if(validateForm()){            
            try {
                const response = await fetch(`${backendURL}/api/register`, {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json', 
                  },
                  body: JSON.stringify({
                    username: formData.username,
                    email: formData.email,
                    password: formData.password,                    
                  })                   
                });

                if (response.ok) {
                    const result = await response.json();  
                    auth.storeToken(result.token)                  
                    console.log('Registration successful:', result);    
                    resetForm();
                    setCurrentStep(2)
                } else {
                const error = await response.json();
                console.error('Error during registration:', error);                
                }
            } catch (error) {
                console.error('Network error:', error);                
            }
        } else {
            console.log('Form data is not valid', errors)
        }               
    }

    const handleSubmitStep2 = async (e) => {
        e.preventDefault()


        try {        
            const userId = auth.getUserId();
            const response = await fetch(`${backendURL}/api/user/${userId}/details`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',                    
                    'Authorization': `Bearer ${auth.getToken()}`
                },
                body: JSON.stringify({
                    d_o_b: formData.d_o_b,
                    weight: formData.weight,
                    height: formData.height,
                    gender: formData.gender
                })
            });

            if (response.ok) {
                const result = await response.json();
                console.log('User details updated successfully:', result);
                resetForm();
            }
        }
        catch (error) {
            console.error('Network error while updating user details:', error);
            setErrors({
                ...errors,
                submit: 'Network error occurred. Please try again.'
            });
        }
    }
    

    return (
        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            {currentStep === 1 && (
                <form onSubmit={handleSubmitStep1}>
                <Input 
                    label="User Name"
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={handleChange} 
                    required={true}
                    error={errors.username} 
                />
                <Input 
                    label="Email"
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange} 
                    required={true}
                    error={errors.email} 
                />
                <Input 
                    label="Password"
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange} 
                    required={true}
                    error={errors.password} 
                />                
                <Button type="submit" label="Sign Up"/>                
            </form>
            )}

            {currentStep === 2 && (
                <form onSubmit={handleSubmitStep2}>
                    <Input
                        label="Data of birth"
                        type="date"
                        name="d_o_b"
                        value={formData.d_o_b} 
                        onChange={handleChange}
                        required={true}
                        error={errors.username} 
                    />
                    <Input
                        label="Weight (kg)"
                        type="number"
                        name="weight"
                        value={formData.weight}
                        onChange={handleChange}
                        required={true}
                        min="1"
                        max="300"
                        error={errors.weight} 
                    />
                    <Input
                        label="Height (cm)"
                        type="number"
                        name="height"
                        value={formData.height}
                        onChange={handleChange}
                        required={true}
                        min="1"
                        max="300"
                        error={errors.height} 
                    />
                    <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-700">
                            Gender
                        </label>
                        <div className="flex gap-4">
                            <label className="inline-flex items-center">
                                <input
                                    type="radio"
                                    name="gender"
                                    value="male"
                                    checked={formData.gender === 'male'}
                                    onChange={handleChange}
                                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                                />
                                <span className="ml-2">Male</span>
                            </label>
                            <label className="inline-flex items-center">
                                <input
                                    type="radio"
                                    name="gender"
                                    value="female"
                                    checked={formData.gender === 'female'}
                                    onChange={handleChange}
                                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                                />
                                                    <span className="ml-2">Female</span>
                            </label>
                        </div>
                    </div>
                    <Button type="submit" label="Complete Registration" />
                </form>
            )}
        </div>
    )
}

export default RegistrationForm