import React from "react";
import "./successpopup.css";

const SuccessPopup = ({ countdown, onClose }) => {
  return (
    <div className="success-popup">
      <div className="text-container">
        <h1>Success!</h1>
        <p>Congratulations, your registration was successful!</p>
        <div className="counter">
          <p>
            Redirecting to the title page in{" "}
            <span className="clock">{countdown}</span> seconds...
          </p>
        </div>
        <button onClick={onClose}>Close now</button>
      </div>
    </div>
  );
};

export default SuccessPopup;
