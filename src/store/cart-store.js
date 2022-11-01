import { createSlice } from "@reduxjs/toolkit";

const findCartItemIndex = (items, itemId) => {
  return items.findIndex(({ id }) => id === itemId);
};

const cartInitialState = {
  items: [],
  totalAmount: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState: cartInitialState,
  reducers: {
    add(state, action) {
      state.totalAmount =
        state.totalAmount + action.payload.price * action.payload.quantity;

      const itemIndex = findCartItemIndex(state.items, action.payload.id);
      const existingCartItem = state.items[itemIndex];

      if (existingCartItem) {
        existingCartItem.quantity =
          existingCartItem.quantity + action.payload.quantity;
      } else {
        const newItem = { ...action.payload, total: action.payload.price };
        state.items = [
          ...state.items,
          {
            name: newItem.name,
            id: newItem.id,
            quantity: newItem.quantity,
            price: newItem.price,
          },
        ];
      }
    },
    remove(state, action) {
      const itemIndex = findCartItemIndex(state.items, action.payload.id);
      const existingCartItem = state.items[itemIndex];

      state.totalAmount = state.totalAmount - existingCartItem.price;

      if (existingCartItem.quantity === 1) {
        state.items = state.items.filter(
          (item) => item.id !== action.payload.id
        );
      } else {
        existingCartItem.quantity--;
      }
    },
    clear(state) {
      state.items = [];
      state.totalAmount = 0;
    },
  },
});

export const cartActions = cartSlice.actions;
export default cartSlice.reducer;
