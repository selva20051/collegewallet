import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/menubtn.css';


function Menubtn() {
    const navigate = useNavigate();

    const handleMnuBtn = () => {
        navigate("/menu"); 
    };

    return (
        <button onClick={handleMnuBtn}>Menu</button>
    );
}

export default Menubtn;
