import { createContext, useReducer, useContext, useEffect } from "react";
import CartReducer from "./CartReducer";

const CartContext = createContext();

const initialState = {
  items: [],
};

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(CartReducer, initialState, () => {
    // Try to get the cart from local storage on initial load
    const localData = localStorage.getItem("cart");
    return localData ? { items: JSON.parse(localData) } : initialState;
  });

  useEffect(() => {
    // Whenever the cart changes, save it to local storage
    localStorage.setItem("cart", JSON.stringify(state.items));
  }, [state.items]);

  const addToCart = (item) => {
    console.log("addToCart function called with item:", item);
    dispatch({
      type: "ADD_TO_CART",
      item: item,
    });
  };

  const removeFromCart = (id) => {
    console.log("removeFromCart function called with id:", id);
    dispatch({
      type: "REMOVE_FROM_CART",
      id: id,
    });
  };

  return (
    <CartContext.Provider
      value={{ cart: state.items, dispatch, addToCart, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
