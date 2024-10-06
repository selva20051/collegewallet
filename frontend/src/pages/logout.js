// src/components/Logout.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/logout.css';


function Logout() {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('isAuthenticated');
        localStorage.removeItem('username');
        alert('Logged out successfully!');
        navigate("/"); 
    };

    return (
        <button onClick={handleLogout}>Logout</button>
    );
}

export default Logout;
