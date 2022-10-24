import { useReducer } from "react";
import CartContext from "./cart-context";

const defaultCartState = {
  items: [],
  totalAmount: 0,
};

const findCartItemIndex = (items, itemId) => {
  console.log(items);
  return items.findIndex(({ id }) => id === itemId);
};

const cartReducer = (state, action) => {
  if (action.identifier === "ADD") {
    const updatedTotalAmount =
      state.totalAmount + action.item.price * action.item.quantity;

    const itemIndex = findCartItemIndex(state.items, action.item.id);
    const existingCartItem = state.items[itemIndex];
    let updatedItems;

    if (existingCartItem) {
      const updatedItem = {
        ...existingCartItem,
        quantity: existingCartItem.quantity + action.item.quantity,
      };
      updatedItems = [...state.items];
      updatedItems[itemIndex] = updatedItem;
    } else {
      updatedItems = state.items.concat(action.item);
    }

    return {
      items: updatedItems,
      totalAmount: updatedTotalAmount,
    };
  }

  if (action.identifier === "REMOVE") {
    const itemIndex = findCartItemIndex(state.items, action.id);
    const existingCartItem = state.items[itemIndex];
    console.log(itemIndex, existingCartItem);

    const updatedTotalAmount = state.totalAmount - existingCartItem.price;
    let updatedItems;

    if (existingCartItem.quantity === 1) {
      updatedItems = state.items.filter((item) => item.id !== action.id);
      console.log(updatedItems);
    } else {
      const updatedItem = {
        ...existingCartItem,
        quantity: existingCartItem.quantity - 1,
      };
      updatedItems = [...state.items];
      updatedItems[itemIndex] = { ...updatedItem };
    }

    return {
      items: updatedItems,
      totalAmount: updatedTotalAmount,
    };
  }

  if (action.identifier === "CLEAR") {
    return defaultCartState;
  }

  return defaultCartState;
};

const CartProvider = (props) => {
  const [cartState, dispatchCartAction] = useReducer(
    cartReducer,
    defaultCartState
  );
  const addItemToCartHandler = (item) => {
    dispatchCartAction({ identifier: "ADD", item });
  };

  const removeItemFromCartHandler = (id) => {
    dispatchCartAction({ identifier: "REMOVE", id });
  };

  const clearCartHandler = () => {
    dispatchCartAction({ identifier: "CLEAR" });
  };

  const cartContext = {
    items: cartState.items,
    totalAmount: cartState.totalAmount,
    addItem: addItemToCartHandler,
    removeItem: removeItemFromCartHandler,
    clearCart: clearCartHandler,
  };

  return (
    <CartContext.Provider value={cartContext}>
      {props.children}
    </CartContext.Provider>
  );
};

export default CartProvider;
