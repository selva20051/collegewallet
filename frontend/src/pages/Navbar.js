import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Logout from './logout';
import '../css/login.css';

function Navbar() {
    const navigate = useNavigate();

    const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
    const username = localStorage.getItem('username');

    return (
        <nav>
            <ul>
                <li><Link to="/">Home</Link></li>
                {isAuthenticated ?  (
                    <>
                        <li>Welcome, {username}!</li>
                        <li><Logout/></li>
                    </>
                ) : (
                    <li><Link to="/login">Login</Link></li>
                )}
            </ul>
        </nav>
    );
}

export default Navbar;
