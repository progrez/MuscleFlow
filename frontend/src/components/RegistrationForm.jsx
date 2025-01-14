import React, {useState} from "react";
import Input from "./ui/Input";
import Button from "./ui/Button";

const RegistrationForm = () => {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        confirmedPassword: '',
        gender: '',
        weight: '',
        height: '',
        data_of_birth: ''
        });

    const [errors, setErrors] = useState({})
    
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

        // Password confirmation validation
        if (!formData.confirmedPassword) {
            newErrors.confirmedPassword = 'Please confirm your password';
        } else if (formData.password !== formData.confirmedPassword) {
            newErrors.confirmedPassword = 'Passwords do not match';
        }

        // Gender validation
        if (!formData.gender) {
            newErrors.gender = 'Please select a gender';
        }

        // Weight validation: Must be a positive number
        if (!formData.weight) {
            newErrors.weight = 'Weight is required';
        } else if (Number(formData.weight) <= 0) {
            newErrors.weight = 'Weight must be a positive number';
        }

        // Height validation: Must be a positive number
        if (!formData.height) {
            newErrors.height = 'Height is required';
        } else if (Number(formData.height) <= 0) {
            newErrors.height = 'Height must be a positive number';
        }

        // Date of birth validation
        if (!formData.data_of_birth) {
            newErrors.data_of_birth = 'Date of birth is required';            
        } 

        // Update the errors state with any validation errors
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };
    

    const clearForm = () => {
        setFormData(previousState => {
            const clearedForm = {
                username: '',
                email: '',
                password: '',
                confirmedPassword: '',
                gender: '',
                weight: '',
                height: '',
                data_of_birth: ''
            }
            return clearedForm
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        if(validateForm()){            
            try {
                const response = await fetch('https://muscleflow-1e736c0d1613.herokuapp.com/api/register', {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json', // Inform server data format
                  },
                  body: {
                    "email": "example@example.com",
                    "password": "password123",
                    "username": "john_doe",
                    "date_of_birth": "1990-01-01",
                    "weight": 70,
                    "height": 175,
                    "gender": "male"
                    }                   
                });

                if (response.ok) {
                    const result = await response.json();
                    console.log('Registration successful:', result);                    
                    setFormData({
                        username: '',
                        email: '',
                        password: '',
                        confirmedPassword: '',
                        gender: '',
                        weight: '',
                        height: '',
                        data_of_birth: '',
                    });
                } else {
                const error = await response.json();
                console.error('Error during registration:', error);                
                }
            } catch (error) {
                console.error('Network error:', error);                
            }
        } else {
            console.log(errors)
        }               
    }
    

    return (
        <form onSubmit={handleSubmit} >
            <Input label="username" type="text" name="username" value={formData.username} onChange={handleChange} required={true}/>
            <Input label="email" type="email" name="email" value={formData.email} onChange={handleChange} required={true}/>
            <Input label="password" type="password" name="password" value={formData.password} onChange={handleChange} required={true}/>
            <Input label="confirm password" type="password" name="confirmedPassword" value={formData.confirmedPassword} onChange={handleChange} required={true}/>
            <div>
                <p>Select a gender:</p>
                <Input label="Male" type="radio" name="gender" value='male' onChange={handleChange} required={true}/>
                <Input label="Female" type="radio" name="gender" value='female' onChange={handleChange} required={true}/>
            </div>
            <Input label="weight (kg)" type="number" name="weight" value={formData.weight} onChange={handleChange} required={true}/>
            <Input label="height (cm)" type="number" name="height" value={formData.height} onChange={handleChange} required={true}/>
            <Input label="data of birth" type="date" name="data_of_birth" value={formData.data_of_birth} onChange={handleChange} required={true}/>
            <Button type="submit" label="Sign Up" />
        </form>
    )
}

export default RegistrationForm