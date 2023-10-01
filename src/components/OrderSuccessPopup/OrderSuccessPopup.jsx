import React from "react";
import "./ordersuccesspopup.css";

const OrderSuccessPopup = ({ message, countdown }) => {
  return (
    <div className="overlay">
      <div className="modal">
        <h2>{message}</h2>
        <div className="counter">
          <p>
            Redirecting to the Orders page in{" "}
            <span className="clock">{countdown}</span> seconds...
          </p>
        </div>
      </div>
    </div>
  );
};

export default OrderSuccessPopup;
