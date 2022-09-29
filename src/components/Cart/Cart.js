import { useContext } from "react";
import CartContext from "../../store/cart-context";
import Modal from "../UI/Modal/Modal";
import CartItem from "./CartItem/CartItem";
import styles from "./Cart.module.css";

const Cart = (props) => {
  const cartCtx = useContext(CartContext);

  const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;
  const hasItems = cartCtx.items.length > 0;

  const cartItemRemoveHandler = (id) => {
    cartCtx.removeItem(id);
  };

  const cartItemAddHandler = (item) => {
    cartCtx.addItem({
      ...item,
      quantity: 1,
    });
  };

  const cartItems = (
    <ul className={styles["cart-items"]}>
      {cartCtx.items.map((cartItem) => (
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

  return (
    <Modal onClose={props.onToggleCart}>
      {cartItems}
      <div className={styles.total}>
        <span>Total Amount</span>
        <span>{totalAmount}</span>
      </div>
      <div className={styles.actions}>
        <button className={styles["button--alt"]} onClick={props.onToggleCart}>
          Close
        </button>
        {hasItems && <button className={styles.button}>Order</button>}
      </div>
    </Modal>
  );
};

export default Cart;
