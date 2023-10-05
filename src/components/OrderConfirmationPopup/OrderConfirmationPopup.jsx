import React from "react";

const OrderConfirmationPopup = ({ message, onConfirm, onCancel }) => {
  return (
    <div className="overlay">
      <div className="modal">
        <p>{message}</p>
        <div className="modal-buttons">
          <button onClick={onCancel}>No</button>
          <button onClick={onConfirm}>Yes</button>
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmationPopup;
