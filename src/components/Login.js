import React, { useState } from "react";
import { loginUser } from "../services/api";

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit =async (event) => {
        event.preventDefault();
        try {
            const userData = { email, password };
            const response = await loginUser(userData);
            localStorage.setItem('token', response.token);
            setMessage('Login Succesful');
        } catch (error) {
            setMessage('An error occurred during login: ' + error.response.data);
        }
    };

    return (
        <div className = "wrapper">
            <div className = "form-box login">
                <form onSubmit = {handleSubmit}>
                    <h1>Login</h1>
                    <div className = "input-box">
                        <input type = "email"
                        placeholder= "Email"
                        value = {email}
                        onChange = {(e) => setEmail(e.target.value)} required />
                    </div>
                    <div className = "input-box">
                        <input type = "password"
                        placeholder= "Password"
                        value = {password}
                        onChange = {(e) => setPassword(e.target.value)} required />
                    </div>

                    <div className = "remember-forgot">
                        <label><input type = "checkbox" /> Remembe me</label>
                        <a href = "#">Forgot password?</a>
                    </div>
                    <button type = "submit">Login</button>
                    <div className = "register-link">
                        <p>Don't have an account? <a href = "#">Register</a></p>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;