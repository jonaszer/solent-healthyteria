import React from "react";
import "./card.css";
import { useCart } from "../../context/CartContext";

function Card(props) {
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    const item = {
      id: props.id,
      imageUrl: props.imageUrl,
      title: props.title,
      price: props.price,
    };
    addToCart(item);
  };

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
              <h4>£ {props.price.toFixed(2)}</h4>
            </div>
            <div className="card-button-container">
              <button className="card-button" onClick={handleAddToCart}>
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Card;
