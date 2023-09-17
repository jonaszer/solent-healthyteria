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
      } else {
        dispatch({ type: "SET_CART_ITEMS", items: [] });
      }
    } else {
      dispatch({ type: "SET_CART_ITEMS", items: [] });
    }
  }, [currentUser]);

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

  const adjustQuantity = (id, amount) => {
    console.log(`Adjusting quantity for item with id: ${id} by ${amount}`);
    dispatch({
      type: "ADJUST_QUANTITY",
      id: id,
      amount: amount,
    });
  };

  return (
    <CartContext.Provider
      value={{
        cart: state.items,
        dispatch,
        addToCart,
        removeFromCart,
        adjustQuantity,
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
