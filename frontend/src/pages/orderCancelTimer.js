import React from "react";

function OrderCancelTimer({ timeRemaining, onCancelOrder }) {
    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
    };

    return (
        <div>
            <h4>Time remaining to cancel order: {formatTime(timeRemaining)}</h4>
            <button onClick={onCancelOrder}>Cancel Order</button>
        </div>
    );
}

export default OrderCancelTimer;
