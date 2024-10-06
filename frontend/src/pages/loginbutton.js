// src/components/Login.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/login.css'; // Import the CSS for styling

function Login() {
    const navigate = useNavigate();

    const handleLogin = () => {
        // Simulate a successful login process
        navigate("/login"); // Redirect to home or dashboard after login
    };

    return (
        <button onClick={handleLogin}>Login</button>
    );
}

export default Login;
