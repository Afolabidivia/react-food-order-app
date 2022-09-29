import React, { useState } from "react";
import Cart from "./components/Cart/Cart";
import Header from "./components/Layout/Header";
import Meals from "./components/Meals/Meals";
import CartProvider from "./store/CartProvider";

function App() {
  const [cartIsOpen, setCartIsOpen] = useState(false);

  const toggleCartHandler = () => {
    setCartIsOpen(!cartIsOpen);
  };
  return (
    <CartProvider>
      {cartIsOpen && <Cart onToggleCart={toggleCartHandler} />}
      <Header onToggleCart={toggleCartHandler} />
      <main>
        <Meals />
      </main>
    </CartProvider>
  );
}

export default App;
