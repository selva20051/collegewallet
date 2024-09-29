import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import '../css/login.css'
import React from "react";

function Home() {
    const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
    const username = localStorage.getItem('username');

    return(
        <>
            
            {/* <Header/> */}
            <Navbar/>
            <div className="canteen">

            </div>
            {/* <Footer/> */}

        </>
    )
}

export default Home;