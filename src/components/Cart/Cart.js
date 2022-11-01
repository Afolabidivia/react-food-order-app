import { useContext, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
// import CartContext from "../../store/cart-context";
import Modal from "../UI/Modal/Modal";
import CartItem from "./CartItem/CartItem";
import styles from "./Cart.module.css";
import Checkout from "./Checkout";
import React from "react";
import { cartActions } from "../../store/cart-store";

const Cart = (props) => {
  // const cartCtx = useContext(CartContext);
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const [isCheckout, setIsCheckout] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [didSubmit, setDidSubmit] = useState(false);

  const totalAmount = `$${cart.totalAmount.toFixed(2)}`;
  const hasItems = cart.items.length > 0;

  const cartItemRemoveHandler = (id) => {
    dispatch(cartActions.remove({ id }));
    // cartCtx.removeItem(id);
  };;

  const cartItemAddHandler = (item) => {
    dispatch(
      cartActions.add({
        ...item,
        quantity: 1,
      })
    );
    // cartCtx.addItem({
    //   ...item,
    //   quantity: 1,
    // });
  };;

  const orderHandler = () => {
    setIsCheckout(true);
  };

  const checkoutCancelHandler = () => {
    setIsCheckout(false);
  };

  const checkoutSubmitHandler = async (checkoutFormData) => {
    setIsSubmitting(true);
    await fetch(
      "https://react-food-delivery-app-346ec-default-rtdb.firebaseio.com/orders.json",
      {
        method: "POST",
        body: JSON.stringify({
          user: checkoutFormData,
          orderItems: cart.items,
        }),
      }
    );
    dispatch(cartActions.clear());
    // cartCtx.clearCart();
    setIsSubmitting(false);
    setDidSubmit(true);
  };;

  const cartItems = (
    <ul className={styles["cart-items"]}>
      {cart.items.map((cartItem) => (
        <CartItem
          id={cartItem.id}
          key={cartItem.id}
          name={cartItem.name}
          price={cartItem.price}
          quantity={cartItem.quantity}
          onRemove={cartItemRemoveHandler.bind(null, cartItem.id)}
          onAdd={cartItemAddHandler.bind(null, cartItem)}
        />
      ))}
    </ul>
  );

  const modalActions = (
    <div className={styles.actions}>
      <button className={styles["button--alt"]} onClick={props.onToggleCart}>
        Close
      </button>
      {hasItems && (
        <button className={styles.button} onClick={orderHandler}>
          Order
        </button>
      )}
    </div>
  );

  const cartModalContent = (
    <React.Fragment>
      {cartItems}
      <div className={styles.total}>
        <span>Total Amount</span>
        <span>{totalAmount}</span>
      </div>
      {isCheckout && (
        <Checkout
          onCancel={checkoutCancelHandler}
          onFormSubmit={checkoutSubmitHandler}
        />
      )}
      {!isCheckout && modalActions}
    </React.Fragment>
  );

  const submittingModalContent = <p>Sending order data...</p>;
  const didSubmitModalContent = (
    <React.Fragment>
      <p>Successfully sent order!</p>
      <div className={styles.actions}>
        <button className={styles.button} onClick={props.onToggleCart}>
          Close
        </button>
      </div>
    </React.Fragment>
  );

  return (
    <Modal onClose={props.onToggleCart}>
      {!isSubmitting && !didSubmit && cartModalContent}
      {isSubmitting && submittingModalContent}
      {!isSubmitting && didSubmit && didSubmitModalContent}
    </Modal>
  );
};

export default Cart;
