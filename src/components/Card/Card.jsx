import React from "react";
import "./card.css";

function Card(props) {
  return (
    <>
      <div className="card">
        <div className="image-container">
          <img className="card-image" src={props.imageUrl} alt={props.title} />
        </div>
        <div className="card-details">
          <div className="card-title-container">
            <h4>{props.title}</h4>
          </div>
          <div className="card-price-container">
            <div className="price-container">
              <h4>£{props.price}</h4>
            </div>
            <div className="card-button-container">
              <button className="card-button">Order</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Card;
