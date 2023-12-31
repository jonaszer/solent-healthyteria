const cartReducer = (state, action) => {
  switch (action.type) {
    case "SET_CART_ITEMS":
      return {
        ...state,
        items: action.items,
      };

    case "ADD_TO_CART":
      const existingItemIndex = state.items.findIndex(
        (item) => item.id === action.item.id
      );

      if (existingItemIndex !== -1) {
        const updatedItems = state.items.map((item, index) => {
          if (index === existingItemIndex) {
            return { ...item, quantity: item.quantity + 1 };
          }
          return item;
        });

        return {
          ...state,
          items: updatedItems,
        };
      } else {
        const newItem = {
          ...action.item,
          quantity: 1,
        };

        return {
          ...state,
          items: [...state.items, newItem],
        };
      }

    case "ADJUST_QUANTITY":
      return {
        ...state,
        items: state.items
          .map((item) =>
            item.id === action.id
              ? { ...item, quantity: item.quantity + action.amount }
              : item
          )
          .filter((item) => item.quantity > 0), // This ensures items with 0 or negative quantities are removed
      };

    case "REMOVE_FROM_CART":
      const itemsAfterRemoval = state.items.filter(
        (item) => item.id !== action.id
      );
      return {
        ...state,
        items: itemsAfterRemoval,
      };

    case "CLEAR_CART":
      return {
        ...state,
        items: [],
      };

    default:
      return state;
  }
};

export default cartReducer;
