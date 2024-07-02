import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from './LoginRegister.module.css';
import { loginUser } from "../services/api";
import { FaUser, FaKey } from "react-icons/fa";
import { jwtDecode } from 'jwt-decode';


const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit =async (e) => {
        e.preventDefault();
        try {
            const userData = { email, password };
            const response = await loginUser(userData);
            localStorage.setItem('token', response.token);
            setMessage('Login Succesful');
            setError('');

            const user = jwtDecode(response.token);
            if (user.role === 'admin') {
                navigate('/admin');
            } else if (user.role === 'user') {
                navigate('/dashboard');
            } else {
                console.log('Authentication error!')
            }
        } catch (error) {
            setError(error.response?.data || 'There was an error during the registration');
        }
    };

    return (
        <div className = {styles.wrapper}>
            <div className = {styles.formBox}>
                <form onSubmit = {handleSubmit}>
                    <h1>Login</h1>
                    {error && <p className = {styles.errorMessage}>{error}</p>}
                    <div className = {styles.inputBox}>
                        <input type = "email"
                        placeholder= "Email"
                        value = {email}
                        onChange = {(e) => setEmail(e.target.value)} required />
                        <FaUser className = {styles.icon}/>
                    </div>
                    <div className = {styles.inputBox}>
                        <input type = "password"
                        placeholder= "Password"
                        value = {password}
                        onChange = {(e) => setPassword(e.target.value)} required />
                        <FaKey className = {styles.icon}/>
                    </div>

                    <div className = {styles.rememberForgot}>
                        <label><input type = "checkbox" /> Remembe me</label>
                        <a href = "#">Forgot password?</a>
                    </div>
                    <button type = "submit">Login</button>
                    <div className = {styles.registerLink}>
                        <p>Don't have an account? <Link to="/register">Register</Link></p>
                    </div>
                </form>
                {message && <p>{message}</p>}
            </div>
        </div>
    );
};

export default Login;