import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Logout from './logout';
import '../css/navbar.css';
import Login from './loginbutton';
import Menubtn from './menubutton';
import Canteenbtn from './canteenbutton';
import logo from '../assests/images/logo.png'

const Navbar = () => {
    const navigate = useNavigate();

    const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
    const username = localStorage.getItem('username');
    return (
        <header className='flex justify-between items-center h-24  px-8'>
            <div className="logo">
                <Link to="/">
                    <img src={logo} alt="logo" className='w-16'></img>
                </Link>
            </div>
            <div>
                <ul className='flex gap-10 font-semibold text-lg'>
                    <li><Menubtn/></li>
                    <li><Canteenbtn/></li>
                    {isAuthenticated ? (
                        <>
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
