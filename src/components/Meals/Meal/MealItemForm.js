import { useRef, useState } from "react";
import Input from "../../UI/Input/Input";
import styles from "./MealItemForm.module.css";

const MealItemForm = (props) => {
  const quantityRef = useRef();
  const [quantityIsValid, setQuantityIsValid] = useState(true);

  const submitHandler = (event) => {
    event.preventDefault();
    const quantity = quantityRef.current.value;
    const quantityNumber = +quantity;

    if (
      quantity.trim().length === 0 ||
      quantityNumber < 1 ||
      quantityNumber > 5
    ) {
      setQuantityIsValid(false);
      return;
    }
    props.onAddItemToCart(quantityNumber);
  };
  return (
    <form onSubmit={submitHandler} className={styles.form}>
      <Input
        ref={quantityRef}
        label=""
        input={{
          type: "number",
          id: `amount_${props.id}`,
          min: "1",
          max: "5",
          step: "1",
          defaultValue: "1",
        }}
      />
      <button>+ Add</button>
      {!quantityIsValid && <p>Please enter a valid quantity!</p>}
    </form>
  );
};

export default MealItemForm;
