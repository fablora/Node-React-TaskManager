import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from './LoginRegister.module.css';
import { registerUser } from "../services/api";
import { MdEmail } from "react-icons/md";
import { FaKey } from "react-icons/fa";

const Register = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate(); 

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const userData = { email, password };
            await registerUser(userData);
            setMessage('Registration Succesful');
            setError('');
            navigate('/login');
        } catch (error) {
            setError(error.response?.data || 'There was an error during the registration');
        }
    };

    return (
        <div className = {styles.wrapper}>
            <div className = {styles.formBox}>
                <form onSubmit = {handleSubmit}>
                    <h1>Register</h1>
                    {error && <p className = {styles.errorMessage}>{error}</p>}
                    <div className = {styles.inputBox}>
                        <input type = "email"
                        placeholder = "Email" 
                        value = {email} 
                        onChange = {(e) => setEmail(e.target.value)} required />
                        <MdEmail className = {styles.icon}/>
                    </div>
                    <div className = {styles.inputBox}>
                        <input type = "password"
                        placeholder = "Password" 
                        value = {password} 
                        onChange = {(e) => setPassword(e.target.value)} required />
                        <FaKey className = {styles.icon}/>
                    </div>
                    <div className = {styles.agreeTerms}>
                        <label><input type = "checkbox" /> I agree to the terms & conditions</label>
                    </div>
                    <button type = "submit">Register</button>
                    <div className= {styles.loginLink}>
                        <p> Already have an account? <Link to="/login">Login</Link></p>
                    </div>
                </form>
                {message && <p>{message}</p>}
            </div>
        </div>
    );
};

export default Register;