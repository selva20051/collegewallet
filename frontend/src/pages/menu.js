import { useState } from "react";
import Navbar from "./Navbar";
import React from "react";
import jsPDF from "jspdf";  
import '../css/menu.css';
import 'jspdf-autotable';  

const importAll = (r) => {
    let images = {};
    r.keys().forEach((item) => {
        images[item.replace('./', '')] = r(item);
    });
    return images;
};

const images = importAll(require.context('../assests/images', false, /\.(png|jpe?g|svg)$/));

function Menu() {
    const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
    const username = localStorage.getItem('username');
    const [inputAmount, setInputAmount] = useState(0);
    const [balance, setBalance] = useState(500);
    const [cartItems, setCartItems] = useState([]);
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [showPDFButton, setShowPDFButton] = useState(false); 
    const [buyButtonVisible, setBuyButtonVisible] = useState(true); 

    const handleAddAmountClick = () => {
        setIsPopupOpen(true);
    };

    const handleConfirmAmount = () => {
        setBalance(prevBalance => prevBalance + parseFloat(inputAmount));
        setIsPopupOpen(false);
        setInputAmount(0);
    };

    const closePopup = () => {
        setIsPopupOpen(false);
    };

    const addToCart = (menuItem) => {
        const existingItem = cartItems.find(item => item.name === menuItem.name);
        if (existingItem) {
            setCartItems(cartItems.map(item => item.name === menuItem.name
                ? { ...item, quantity: item.quantity + 1 }
                : item));
        } else {
            setCartItems([...cartItems, { ...menuItem, quantity: 1 }]);
        }

       
        if (cartItems.length === 0) {
            setBuyButtonVisible(true);
        }
    };

    const updateQuantity = (menuItem, delta) => {
        setCartItems(cartItems.map(item => item.name === menuItem.name
            ? { ...item, quantity: Math.max(item.quantity + delta, 0) }
            : item));
    };

    
    const calculateTotal = () => {
        return cartItems.reduce((acc, item) => acc + (parseFloat(item.price.slice(1)) * item.quantity), 0).toFixed(2);
    };

    
    const handleBuy = () => {
        setShowPDFButton(true);   
        setBuyButtonVisible(false);  
        alert("Your Order Is Placed");
    };

    
    const handleDownloadPDF = () => {
        const doc = new jsPDF();

        
        const username = localStorage.getItem('username') || 'Customer';  

        
        doc.setFontSize(18);
        doc.setFont("helvetica", "bold");
        doc.text("Order Summary", 105, 20, { align: 'center' });

        
        doc.setLineWidth(0.5);
        doc.line(10, 25, 200, 25);

        
        doc.setFontSize(12);
        doc.text(`Order placed by: ${username}`, 10, 35);  
        doc.text("Thank you for your order! Here is a summary of your purchase:", 10, 45);

       
        const tableColumn = ["Item Name", "Quantity", "Price"];
        const tableRows = [];

        cartItems.forEach(item => {
            const itemData = [
                item.name,
                item.quantity,
                `${(parseFloat(item.price.slice(1)) * item.quantity).toFixed(2)}`
            ];
            tableRows.push(itemData);
        });

        tableRows.push(["", "Total", `${calculateTotal()}`]);

        doc.autoTable({
            startY: 50,
            head: [tableColumn],
            body: tableRows,
            theme: 'grid',
            headStyles: { fillColor: [255, 0, 0] },  
            styles: { fontSize: 10, halign: 'center' },
            footStyles: { fillColor: [0, 0, 0] },  
        });

        doc.text("We hope you enjoy your purchase!", 105, doc.lastAutoTable.finalY + 10, { align: 'center' });

        doc.save("order_summary.pdf");

        setCartItems([]);
        setShowPDFButton(false);
    };


    const menuItems = [
        { name: "Tea", image: "tea.jpg", price: "₹15" },
        { name: "Coffee", image: "coffee.jpg", price: "₹19" },
        { name: "Samosa Pav", image: "samosa_pav.jpg", price: "₹20" },
        { name: "Vada Pav", image: "vada_pav.jpg", price: "₹20" },
        { name: "Idli Sambhar", image: "idli.jpg", price: "₹39" },
        { name: "Medu Vada", image: "medu.jpg", price: "₹50" },
        { name: "Misal Pav", image: "misal.jpg", price: "₹50" },
        { name: "Sada Dosa", image: "dosa.jpg", price: "₹42" },
        { name: "Masala Dosa", image: "masaladosa.jpg", price: "₹60" },
        { name: "Onion Uttapam", image: "onionuttapam.jpg", price: "₹55" },
        { name: "Tomato Uttapam", image: "tomatouttapam.jpg", price: "₹55" },
        { name: "Cheese Sandwich", image: "cheesesandwich.jpg", price: "₹76" },
        { name: "Toast Sandwich", image: "toastsandwich.jpg", price: "₹60" },
        { name: "Bhel Puri", image: "bhelpuri.jpg", price: "₹38" },
        { name: "Sev Puri", image: "sevpuri.jpg", price: "₹38" },
        { name: "Schezwan Noodles", image: "schezwannoodles.jpg", price: "₹91" },
        { name: "Hakka Noodles", image: "hakkanoodles.jpg", price: "₹86" },
        { name: "Fried Rice", image: "friedrice.jpg", price: "₹86" },
        { name: "Paneer Chilly", image: "paneerchilli.jpg", price: "₹107" },
        { name: "Manchow Soup", image: "manchowsoup.jpg", price: "₹68" },
        { name: "Potato Bhaji", image: "potatobhaji.jpg", price: "₹45" },
        { name: "Dal Rice", image: "dalrice.jpg", price: "₹44" },
        { name: "Pulao Rice", image: "pulaorice.jpg", price: "₹56" },
        { name: "Dal Khichdi", image: "dalkhichdi.jpg", price: "₹70" }
    ];

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

            <div className="menu-container">
                {menuItems.map((item, index) => (
                    <div className="menu-item" key={index}>
                        <div className="menu-img">
                            <img src={images[item.image]} alt={item.name} />
                        </div>
                        <h3>{item.name}</h3>
                        <div className="price">{item.price}</div>
                        <div className="quantity-control">
                            <button onClick={() => updateQuantity(item, -1)}>-</button>
                            <span>{cartItems.find(cartItem => cartItem.name === item.name)?.quantity || 0}</span>
                            <button onClick={() => updateQuantity(item, 1)}>+</button>
                        </div>
                        <button className="add-to-cart" onClick={() => addToCart(item)}>Add to Cart</button>
                    </div>
                ))}
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

            <div className="cart">
                <h2>Your Cart</h2>
                {cartItems.length > 0 ? (
                    <>
                        {cartItems.map((item, index) => (
                            <div key={index} className="cart-item">
                                <h4>{item.name} x {item.quantity}</h4>
                            </div>
                        ))}
                        <div className="total-to-pay">
                            <span>To Pay:</span>
                            <span>₹{calculateTotal()}</span>
                        </div>
                        {buyButtonVisible && (
                            <button className="buy-button" onClick={handleBuy}>Buy</button>
                        )}
                        {showPDFButton && (
                            <button className="download-pdf" onClick={handleDownloadPDF}>Download INVOICE</button>
                        )}
                    </>
                ) : (
                    <p>No items in the cart</p>
                )}
            </div>
        </>
    );
}

export default Menu;
