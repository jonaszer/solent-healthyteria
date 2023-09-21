import React, { useState } from "react";
import "./orderItem.css";
import { FaChevronDown } from "react-icons/fa";

const OrderItem = ({ orderDetails }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <li
      className={`order-item ${isExpanded ? "expanded" : ""}`}
      onClick={() => setIsExpanded(!isExpanded)}>
      <div className="order-overview">
        <div className="section">
          <h4>Order ID</h4>
          <h5>{orderDetails.id}</h5>
        </div>
        <div className="section">
          <h4>Date</h4>
          <h5>{orderDetails.orderDate}</h5>
        </div>
        <div className="section">
          <h4>Deliver By</h4>
          <h5>{orderDetails.selectedTime}</h5>
        </div>
        <div className="section">
          <h4>Location</h4>
          <h5>
            {orderDetails.locationType.toUpperCase()}{" "}
            {orderDetails.locationNumber}
          </h5>
        </div>
        <div className="section">
          <h4>Total Price</h4>
          <h5>£{orderDetails.totalOrderPrice.toFixed(2)}</h5>
        </div>
        <div className="section">
          <FaChevronDown
            className={`order-item-chevron ${isExpanded ? "rotate" : ""}`}
            size={22}
          />
        </div>
      </div>

      {isExpanded && (
        <ul>
          <div className="order-item-line"></div>
          <div className="item-list-titles-container">
            <div className="list-item-title">
              <h4>Item Title</h4>
            </div>
            <div className="list-item-price-subtotal">
              <h4>Unit Price</h4>
            </div>
            <div className="list-item-price-subtotal">
              <h4>Sub-Total</h4>
            </div>
          </div>
          {orderDetails.items.map((item, index) => (
            <li key={index}>
              <div>
                <h5>
                  {item.title} x ({item.quantity})
                </h5>
              </div>
              <div>
                <h5>£ {item.price.toFixed(2)}</h5>
              </div>
              <div>
                <h5>£ {item.subtotal.toFixed(2)}</h5>
              </div>
            </li>
          ))}
        </ul>
      )}
    </li>
  );
};

export default OrderItem;
