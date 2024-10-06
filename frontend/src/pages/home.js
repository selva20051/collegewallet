import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import '../css/home.css';
import React from "react";

function Home() {
    const [selectedCanteen, setSelectedCanteen] = useState(''); 
    const [isPopupOpen, setIsPopupOpen] = useState(false); 
    const [inputAmount, setInputAmount] = useState(0); 
    const [balance, setBalance] = useState(500);
    const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
    const username = localStorage.getItem('username');
    const navigate = useNavigate();

    const handleCanteenClick = (canteenName) => {
        setSelectedCanteen(canteenName);
        console.log(`Selected Canteen: ${canteenName}`);
        navigate("/menu", { state: { CanteenName: canteenName } });
    };

    const handleAddAmountClick = () => {
        setIsPopupOpen(true); 
    };

    const handleConfirmAmount = () => {
      
        setBalance(prevBalance => prevBalance + parseFloat(inputAmount));
        setIsPopupOpen(false); 
        setInputAmount(0)
    };

    const closePopup = () => {
        setIsPopupOpen(false); 
    };

    return (
        <>
            <Navbar />
            <div className="balance">
                <div className="balcontain">
                    {isAuthenticated ? (
                        <div>
                            <h1>Welcome, {username}!</h1>
                            <p>Balance: {balance}</p>
                            <button onClick={handleAddAmountClick}>Add Amount</button>
                        </div>
                    ) : (
                        <p>Login First!!</p>
                    )}
                </div>
            </div>

          
            <div className="container">
                <div className="container1">
                    <div className="canContainer" onClick={() => handleCanteenClick('Aurobindo Canteen')}>
                        <img className="canImg" src="../assets/aurocan.jpg" alt="Aurobindo" />
                        <h3>Aurobindo Canteen</h3>
                    </div>
                    <div className="canContainer" onClick={() => handleCanteenClick('Bhaskaracharya Canteen')}>
                        <img className="canImg" src="../assets/bhaskacan.jpg" alt="Bhaskaracharya" />
                        <h3>Bhaskaracharya Canteen</h3>
                    </div>
                </div>
                <div className="container2">
                    <div className="canContainer" onClick={() => handleCanteenClick('Management Canteen')}>
                        <img className="canImg" src="../assets/managecan.jpg" alt="Management" />
                        <h3>Management Canteen</h3>
                    </div>
                    <div className="canContainer" onClick={() => handleCanteenClick('Maggi Point')}>
                        <img className="canImg" src="../assets/magican.jpg" alt="Maggi" />
                        <h3>Maggi Point</h3>
                    </div>
                </div>
            </div>

            
            {isPopupOpen && (
                <div className="popup-overlay">
                    <div className="popup-content">
                        <h2>Add Amount</h2>
                        <input 
                            type="number" 
                            placeholder="Enter Amount" 
                            value={inputAmount} 
                            onChange={(e) => setInputAmount(e.target.value)} 
                        />
                        <button onClick={closePopup}>Close</button>
                        <button onClick={handleConfirmAmount}>Confirm</button>
                    </div>
                </div>
            )}
        </>
    );
}

export default Home;
