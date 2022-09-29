import { useContext, useEffect, useState } from "react";
import CartContext from "../../store/cart-context";
import CartIcon from "../Cart/CartIcon";
import styles from "./HeaderCartButton.module.css";

const HeaderCartButton = (props) => {
  const [animateBtn, setAnimateBtn] = useState(false);
  const cartCtx = useContext(CartContext);
  const { items } = cartCtx;

  const numberOfCartItems = items.reduce(
    (prevElem, curElem) => prevElem + curElem.quantity,
    0
  );

  const btnClasses = `${styles.button} ${animateBtn ? styles.bump : ""}`;

  useEffect(() => {
    if (items.length === 0) {
      return;
    }

    setAnimateBtn(true);

    const timer = setTimeout(() => {
      setAnimateBtn(false);
    }, 300);

    return () => {
      clearTimeout(timer);
    };
  }, [items]);

  return (
    <button className={btnClasses} onClick={props.onClick}>
      <span className={styles.icon}>
        <CartIcon />
      </span>
      <span>Your cart</span>
      <span className={styles.badge}>{numberOfCartItems}</span>
    </button>
  );
};

export default HeaderCartButton;
