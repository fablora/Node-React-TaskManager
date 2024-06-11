import React, { useState } from "react";
import { Link } from "react-router-dom";
import './LoginRegister.css';
import { registerUser } from "../services/api";
import { MdEmail } from "react-icons/md";
import { FaKey } from "react-icons/fa";

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
                        <MdEmail className="icon"/>
                    </div>
                    <div className = "input-box">
                        <input type = "password"
                        placeholder = "Password" 
                        value = {password} 
                        onChange = {(e) => setPassword(e.target.value)} required />
                        <FaKey className="icon"/>
                    </div>
                    <div className = "agree-terms">
                        <label><input type = "checkbox" /> I agree to the terms & conditions</label>
                    </div>
                    <button type = "submit">Register</button>
                    <div className= "login-link">
                        <p> Already have an account? <Link to="/login">Login</Link></p>
                    </div>
                </form>
                {message && <p>{message}</p>}
            </div>
        </div>
    );
};

export default Register;