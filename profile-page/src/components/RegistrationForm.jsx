import React, {useState} from "react";
import Input from "./ui/Input";
import Button from "./ui/Button";

const RegistrationForm = () => {
    const [formData, setFormData] = useState({
        userName: '',
        email: '',
        password: '',
        confirmedPassword: '',
        gender: '',
        weight: '',
        height: '',
        data_of_birth: ''
        });
    
    const handleChange = () => {

    }

    const clearForm = () => {
        setFormData(previousState => {
            const clearedForm = {
                userName: '',
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

    const handleSubmit = (e) => {
        e.preventDefault()
        alert('Account created!')
        clearForm();
    }
    

    return (
        <form onSubmit={handleSubmit} method="post">
            <Input label="user name" type="text" name="text" value={formData.userName} onChange={handleChange}/>
            <Input label="email" type="email" name="email" value={formData.email} onChange={handleChange}/>
            <Input label="password" type="password" name="password" value={formData.password} onChange={handleChange}/>
            <Input label="confirm password" type="password" name="confirm password" value={formData.confirmedPassword} onChange={handleChange}/>
            <Input label="gender" type="radio" name="gender" value={formData.gender} onChange={handleChange}/>
            <Input label="weight" type="number" name="weight" value={formData.weight} onChange={handleChange}/>
            <Input label="height" type="number" name="height" value={formData.height} onChange={handleChange}/>
            <Input label="data_of_birth" type="data" name="data_of_birth" value={formData.data_of_birth} onChange={handleChange}/>
            <Button type="submit" lable="Sign Up" onChange={handleChange}/>
        </form>
    )
}

export default RegistrationForm