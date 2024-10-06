import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Logout from './logout';
import '../css/navbar.css';
import Login from './loginbutton';
import logo from '../assests/images/university-logo.png'

function Navbar() {
    const navigate = useNavigate();

    const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
    const username = localStorage.getItem('username');

    return (
        <header className='flex justify-between items-center h-24  px-8'>
            <div className="logo">
                <img src={logo} alt="logo" className='w-16'></img>
            </div>
            <div>
                <ul className='flex gap-10 font-semibold text-lg'>
                    <li>Menu</li>
                    <li>Canteen</li>
                    {isAuthenticated ? (
                        <>
                            <li>Welcome, {username}!</li>
                            <li><Logout /></li>
                        </>
                    ) : (
                        <li><Link to="/login"><Login /></Link></li>
                    )}
                </ul>
            </div>
        </header>
    );
}

export default Navbar;
