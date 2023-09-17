import React from "react";
import { useCart } from "../../context/CartContext";
import "./cart.css";
import NavBar from "../../components/Navigation/NavBar";

const Cart = () => {
  const { cart, removeFromCart } = useCart();

  return (
    <>
      <NavBar />
      <div className="cart-container">
        <h2>Your Cart</h2>
        {cart.length === 0 ? (
          <p>Your cart is empty!</p>
        ) : (
          <ul>
            {cart.map((item, index) => (
              <li key={index}>
                {item.title} - {item.price} x {item.quantity}
                <button
                  onClick={() => {
                    removeFromCart(item.id);
                  }}>
                  Remove
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
};

export default Cart;
