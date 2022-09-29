import { useContext } from "react";
import CartContext from "../../../store/cart-context";
import styles from "./MealItem.module.css";
import MealItemForm from "./MealItemForm";

const MealItem = (props) => {
  const cartCtx = useContext(CartContext);
  const price = `$${props.price.toFixed(2)}`;

  const addToCartHandler = (quantity) => {
    cartCtx.addItem({
      name: props.name,
      id: props.id,
      quantity,
      price: props.price,
    });
  };

  return (
    <li className={styles.meal} key={props.id}>
      <div>
        <h3>{props.name}</h3>
        <div>{props.description}</div>
        <div>{price}</div>
      </div>
      <div>
        <MealItemForm id={props.id} onAddItemToCart={addToCartHandler} />
      </div>
    </li>
  );
};

export default MealItem;
