import { createContext, useReducer, useContext, useEffect } from "react";
import CartReducer from "./CartReducer";
import { AuthContext } from "./AuthContext";

const CartContext = createContext();

const initialState = {
  items: [],
};

export const CartProvider = ({ children }) => {
  const { currentUser } = useContext(AuthContext);
  const [state, dispatch] = useReducer(CartReducer, initialState);

  useEffect(() => {
    if (currentUser) {
      const localData = localStorage.getItem(`cart_${currentUser.uid}`);
      if (localData) {
        dispatch({ type: "SET_CART_ITEMS", items: JSON.parse(localData) });
      }
    }
  }, [currentUser]);

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem(
        `cart_${currentUser.uid}`,
        JSON.stringify(state.items)
      );
    }
  }, [state.items, currentUser]);

  const addToCart = (item) => {
    dispatch({
      type: "ADD_TO_CART",
      item: item,
    });
  };

  const removeFromCart = (id) => {
    dispatch({
      type: "REMOVE_FROM_CART",
      id: id,
    });
  };

  const adjustQuantity = (id, amount) => {
    dispatch({
      type: "ADJUST_QUANTITY",
      id: id,
      amount: amount,
    });
  };

  const clearCart = () => {
    dispatch({ type: "CLEAR_CART" });
    if (currentUser) {
      localStorage.removeItem(`cart_${currentUser.uid}`);
    }
  };

  return (
    <CartContext.Provider
      value={{
        cart: state.items,
        dispatch,
        addToCart,
        removeFromCart,
        adjustQuantity,
        clearCart,
      }}>
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
