import React, { useEffect, useState } from "react";
import { db, auth } from "../../firebase";
import { useCart } from "../../context/CartContext";
import { collection, addDoc } from "firebase/firestore";
import "./cart.css";
import NavBar from "../../components/Navigation/NavBar";
import Footer from "../../components/Footer/Footer";
import { FaPlus, FaMinus, FaTrash } from "react-icons/fa";
import OrderConfirmationPopup from "../../components/OrderConfirmationPopup/OrderConfirmationPopup";
import OrderSuccessPopup from "../../components/OrderSuccessPopup/OrderSuccessPopup";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const { cart, removeFromCart, adjustQuantity, clearCart } = useCart();
  const [selectionType, setSelectionType] = useState("");
  const [tableNumber, setTableNumber] = useState(1);
  const [labNumber, setLabNumber] = useState(101);
  const [time, setTime] = useState("10:00");
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [showPlaceOrderModal, setShowPlaceOrderModal] = useState(false);
  const [countdown, setCountdown] = useState(3);

  const navigate = useNavigate();

  useEffect(() => {
    if (showSuccessPopup && countdown > 0) {
      const timer = setTimeout(() => {
        setCountdown(countdown - 1);
      }, 1000);

      return () => clearTimeout(timer);
    } else if (countdown === 0) {
      navigate("/my-orders");
    }
  }, [showSuccessPopup, countdown, navigate]);

  const handleTableChange = (e) => {
    setTableNumber(e.target.value);
  };

  const handleLabChange = (e) => {
    setLabNumber(e.target.value);
  };

  const handleTimeChange = (e) => {
    setTime(e.target.value);
  };

  const promptDelete = (itemId) => {
    setItemToDelete(itemId);
    setShowDeleteModal(true);
    setShowPlaceOrderModal(false);
  };

  const confirmDelete = () => {
    removeFromCart(itemToDelete);
    setShowDeleteModal(false);
  };

  const cancelDelete = () => {
    setItemToDelete(null);
    setShowDeleteModal(false);
  };

  const confirmOrder = async () => {
    const locationNumber = selectionType === "table" ? tableNumber : labNumber;
    const totalPrice = cart.reduce((accumulator, item) => {
      return accumulator + item.price * item.quantity;
    }, 0);
    const orderDate = new Date();
    const formattedOrderDate = `${orderDate.getFullYear()}-${String(
      orderDate.getMonth() + 1
    ).padStart(2, "0")}-${String(orderDate.getDate()).padStart(2, "0")}`;

    const orderDetails = {
      userId: auth.currentUser.uid,
      email: auth.currentUser.email,
      items: cart.map((item) => ({
        id: item.id,
        title: item.title,
        quantity: item.quantity,
        price: item.price,
        subtotal: item.price * item.quantity,
      })),
      locationType: selectionType,
      locationNumber: selectionType === "table" ? tableNumber : labNumber,
      selectedTime: time,
      orderDate: formattedOrderDate,
      totalOrderPrice: totalPrice,
    };

    try {
      await addDoc(collection(db, "orders"), orderDetails);
      clearCart();
      setSuccessMessage(
        `Order placed for ${selectionType.toUpperCase()} ${locationNumber} at ${time}`
      );
      setShowPlaceOrderModal(false);
      setShowSuccessPopup(true);
    } catch (error) {
      alert(`Error placing order: ${error.message}`);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectionType) {
      alert("Please select a Table or Lab");
      return;
    }

    setShowPlaceOrderModal(true);
  };

  const totalAmount = cart.reduce((accumulator, item) => {
    return accumulator + item.price * item.quantity;
  }, 0);

  return (
    <>
      <NavBar />
      <div className="cart-container">
        <h1>Your Cart</h1>
        {cart.length === 0 ? (
          <div className="empty-cart-container">
            <div className="empty-cart-p-container">
              <p>Your cart is empty!</p>
            </div>
          </div>
        ) : (
          <>
            <div className="items-and-total-container">
              <ul>
                {cart.map((item, index) => (
                  <li key={index}>
                    <div className="cart-list-image-container">
                      <img src={item.imageUrl} alt={item.title} />
                    </div>
                    <div className="cart-content">
                      <div className="cart-details-container">
                        <div className="cart-details-title-container">
                          <h3>{item.title}</h3>
                        </div>
                        <div className="cart-line"></div>
                        <div className="cart-price-quantity-button-container">
                          <div className="cart-price-quantity-container">
                            <div className="cart-detail-columns-containers">
                              <h3>Price:</h3>
                              <h3>£ {item.price.toFixed(2)}</h3>
                            </div>
                            <div className="cart-detail-columns-containers">
                              <h3>Quantity:</h3>
                              <h3>
                                <button
                                  className="quantity-button"
                                  onClick={() => {
                                    if (item.quantity === 1) {
                                      promptDelete(item.id);
                                    } else {
                                      adjustQuantity(item.id, -1);
                                    }
                                  }}>
                                  <FaMinus className="minus-plus-icon" />
                                </button>
                                <span className="quantity-text">
                                  {item.quantity}
                                </span>
                                <button
                                  className="quantity-button"
                                  onClick={() => adjustQuantity(item.id, 1)}>
                                  <FaPlus className="minus-plus-icon" />
                                </button>
                              </h3>
                            </div>
                            <div className="cart-detail-columns-containers">
                              <h3>Sub-Total: </h3>
                              <h3>
                                £ {(item.price * item.quantity).toFixed(2)}
                              </h3>
                            </div>
                          </div>
                          <div className="cart-button-container">
                            <button
                              className="cart-button"
                              onClick={() => promptDelete(item.id)}>
                              <FaTrash className="trash-icon" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
              <div className="total-amount-container">
                <h1>Summary-List</h1>
                <ul className="summary-list">
                  {cart.map((item, index) => (
                    <li key={index}>
                      <span className="summary-list-title-quantity-container">
                        {item.title} (x{item.quantity}):{" "}
                      </span>
                      <span className="summary-list-subtotal-price-container">
                        £ {(item.price * item.quantity).toFixed(2)}
                      </span>
                    </li>
                  ))}
                </ul>
                <div className="cart-line"></div>
                <div className="total-display">
                  <strong>Total:</strong>{" "}
                  <span>£ {totalAmount.toFixed(2)}</span>
                </div>
                <form onSubmit={handleSubmit}>
                  {" "}
                  <div className="selection-container">
                    <p>
                      Please choose a location and an hour for the delivery of
                      your order.
                    </p>
                    <div>
                      <input
                        type="radio"
                        id="table"
                        name="selectionType"
                        value="table"
                        onChange={() => setSelectionType("table")}
                        required
                      />
                      <label htmlFor="table" className="radio-label">
                        Table
                      </label>

                      <input
                        type="radio"
                        id="lab"
                        name="selectionType"
                        value="lab"
                        onChange={() => setSelectionType("lab")}
                      />
                      <label htmlFor="lab" className="radio-label">
                        Lab
                      </label>
                    </div>
                    {selectionType === "table" && (
                      <div>
                        <label htmlFor="tableSelect">Select Table:</label>
                        <select
                          id="tableSelect"
                          name="tableNumber"
                          onChange={handleTableChange}>
                          {Array.from({ length: 10 }, (_, i) => i + 1).map(
                            (number) => (
                              <option key={number} value={number}>
                                {number}
                              </option>
                            )
                          )}
                        </select>
                      </div>
                    )}
                    {selectionType === "lab" && (
                      <div>
                        <label htmlFor="labSelect">Select Lab:</label>
                        <select
                          id="labSelect"
                          name="labNumber"
                          onChange={handleLabChange}>
                          {Array.from(
                            { length: 3 },
                            (_, i) => (i + 1) * 100 + 1
                          ).map((base) =>
                            Array.from({ length: 5 }, (_, j) => base + j).map(
                              (number) => (
                                <option key={number} value={number}>
                                  {number}
                                </option>
                              )
                            )
                          )}
                        </select>
                      </div>
                    )}
                    <label htmlFor="timeSelect">Select Time:</label>
                    <select
                      id="timeSelect"
                      name="time"
                      onChange={handleTimeChange}
                      required>
                      {Array.from({ length: 11 }, (_, i) => i * 0.5 + 10).map(
                        (hour) => {
                          const wholeHour = Math.floor(hour);
                          const minutes =
                            hour - wholeHour === 0.5 ? "30" : "00";
                          const time = `${wholeHour}:${minutes}`;
                          return (
                            <option key={time} value={time}>
                              {time}
                            </option>
                          );
                        }
                      )}
                    </select>
                    <button type="submit">Place Order</button>
                  </div>
                </form>
              </div>
            </div>
          </>
        )}
      </div>
      <Footer />
      {showDeleteModal && (
        <div className="overlay">
          <div className="modal">
            <p>Do you really want to remove this item from the cart?</p>
            <div className="modal-buttons">
              <button onClick={cancelDelete}>No</button>
              <button onClick={confirmDelete}>Yes</button>
            </div>
          </div>
        </div>
      )}
      {showPlaceOrderModal && (
        <OrderConfirmationPopup
          message="Do you really want to place this order?"
          onConfirm={confirmOrder}
          onCancel={() => setShowPlaceOrderModal(false)}
        />
      )}
      {showSuccessPopup && (
        <OrderSuccessPopup message={successMessage} countdown={countdown} />
      )}
    </>
  );
};

export default Cart;
