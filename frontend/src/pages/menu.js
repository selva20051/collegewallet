import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import React from "react";


function Menu() {
    const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
    const username = localStorage.getItem('username');
    return(
        <>  
            
            
            <Navbar/>
            <div className="menu">
                menu
            </div>
            <div>
                bill

            </div>
            {/* <Footer/> */}

        </>
    )
}

export default Menu;