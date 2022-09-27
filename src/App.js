import React, { useState } from "react";
import Cart from "./components/Cart/Cart";
import Header from "./components/Layout/Header";
import Meals from "./components/Meals/Meals";

function App() {
  const [cartIsOpen, setCartIsOpen] = useState(false);

  const toggleCartHandler = () => {
    console.log("HERE!!!");
    setCartIsOpen(!cartIsOpen);
  };
  return (
    <React.Fragment>
      {cartIsOpen && <Cart toggleCart={toggleCartHandler} />}
      <Header toggleCart={toggleCartHandler} />
      <main>
        <Meals />
      </main>
    </React.Fragment>
  );
}

export default App;
