import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/canteenbtn.css';


function Canteenbtn() {
    const navigate = useNavigate();

    const handleCtnBtn = () => {
        navigate("/"); 
    };

    return (
        <button onClick={handleCtnBtn}>Canteen</button>
    );
}

export default Canteenbtn;
