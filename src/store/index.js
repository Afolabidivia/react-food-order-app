import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cart-store";

const store = configureStore({
  reducer: { cart: cartReducer },
});

export default store;
