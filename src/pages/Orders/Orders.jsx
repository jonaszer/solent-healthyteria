import React, { useState, useEffect, useContext } from "react";
import "./Orders.css";
import NavBar from "../../components/Navigation/NavBar";
import Footer from "../../components/Footer/Footer";
import { db } from "../../firebase";
import { collection, getDocs, query, where, orderBy } from "firebase/firestore";
import { AuthContext } from "../../context/AuthContext";
import OrderItem from "../../components/OrderItem/OrderItem";

const Orders = () => {
  const [orders, setOrders] = useState(null); // Start with 'null' to represent "not yet loaded"
  const { currentUser } = useContext(AuthContext);

  useEffect(() => {
    if (currentUser) {
      const fetchOrders = async () => {
        try {
          const ordersRef = collection(db, "orders");
          const q = query(
            ordersRef,
            where("userId", "==", currentUser.uid),
            orderBy("orderDate", "desc")
          );

          const querySnapshot = await getDocs(q);
          const fetchedOrders = [];
          querySnapshot.forEach((doc) => {
            fetchedOrders.push({ id: doc.id, ...doc.data() });
          });
          setOrders(fetchedOrders);
        } catch (error) {
          console.error("Error fetching orders: ", error);
        }
      };

      fetchOrders();
    }
  }, [currentUser]);

  return (
    <>
      <NavBar />
      <div className="orders">
        <div className="orders-title-container">
          <h1>Your Orders</h1>
        </div>
        {
          // Check if 'orders' is still null (data not fetched yet)
          orders === null ? null : orders.length === 0 ? ( // or return <></> for an empty fragment
            <p>No orders found.</p>
          ) : (
            <ul>
              {orders.map((order) => (
                <OrderItem key={order.id} orderDetails={order} />
              ))}
            </ul>
          )
        }
      </div>
      <Footer />
    </>
  );
};

export default Orders;
