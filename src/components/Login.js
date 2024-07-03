import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from './LoginRegister.module.css';
import useForm from "./hooks/useForm";
import { loginUser } from "../services/api";
import { FaUser, FaKey } from "react-icons/fa";
import { jwtDecode } from 'jwt-decode';


const Login = () => {
    const [values, handleChange, message, setMessage, error, setError] = useForm({
        email: '',
        password: '',
    });
    const navigate = useNavigate();

    const handleSubmit =async (e) => {
        e.preventDefault();
        try {
            const response = await loginUser(values);
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
                        name = "email"
                        placeholder= "Email"
                        value = {values.email}
                        onChange = {handleChange} required />
                        <FaUser className = {styles.icon}/>
                    </div>
                    <div className = {styles.inputBox}>
                        <input type = "password"
                        name = "password"
                        placeholder= "Password"
                        value = {values.password}
                        onChange = {handleChange} required />
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