import React, { useState } from "react";
import { registerUser } from "../services/api";

const Register = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const userData = { email, password };
            const response = await registerUser(userData);
            setMessage('Registration Succesful');
        } catch (error) {
            setMessage('There was an error dusing the resgistration ' + error.response.data);
        }
    };

    return (
        <div className = "wrapper">
            <div className = "form-box register">
                <form onSubmit = {handleSubmit}>
                    <h1>Register</h1>
                    <div className = "input-box">
                        <input type = "email"
                        placeholder = "Email" 
                        value = {email} 
                        onChange = {(e) => setEmail(e.target.value)} required />
                    </div>
                    <div className = "input-box">
                        <input type = "password"
                        placeholder = "Password" 
                        value = {password} 
                        onChange = {(e) => setPassword(e.target.value)} required />
                    </div>
                    <div className = "remember-forgot">
                        <label><input type = "checkbox" /> I agree to the terms & conditions</label>
                    </div>
                    <button type = "submit">Register</button>
                    <div className= "register-link">
                        <p> Already have an account? <a href="#">Login</a></p>
                    </div>
                </form>
                {message && <p>{message}</p>}
            </div>
        </div>
    );
};

export default Register;