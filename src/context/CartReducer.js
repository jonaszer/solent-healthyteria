const cartReducer = (state, action) => {
  switch (action.type) {
    case "ADD_TO_CART":
      const existingItemIndex = state.items.findIndex(
        (item) => item.id === action.item.id
      );

      if (existingItemIndex !== -1) {
        // If the item already exists in the cart, produce a new array with the updated item
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
        // If the item is not in the cart, add it with quantity 1
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

    default:
      return state;
  }
};

export default cartReducer;
