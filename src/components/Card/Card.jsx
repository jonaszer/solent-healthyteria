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
          <p>description</p>
          <h4>£{props.price}</h4>
        </div>
      </div>
    </>
  );
}

export default Card;
