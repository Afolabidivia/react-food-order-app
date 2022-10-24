import useInput from "../../hooks/use-input";
import classes from "./Checkout.module.css";

const isNotEmpty = (value) => value.trim() !== "";
const isFiveChars = (value) => value.trim().length === 5;

const Checkout = (props) => {
  const {
    value: name,
    isValid: nameIsValid,
    hasError: nameHasError,
    valueChangeHandler: nameChangeHandler,
    inputBlurHandler: nameBlurHandler,
    reset: nameReset,
  } = useInput(isNotEmpty);

  const {
    value: street,
    isValid: streetIsValid,
    hasError: streetHasError,
    valueChangeHandler: streetChangeHandler,
    inputBlurHandler: streetBlurHandler,
    reset: streetReset,
  } = useInput(isNotEmpty);

  const {
    value: postalCode,
    isValid: postalCodeIsValid,
    hasError: postalCodeHasError,
    valueChangeHandler: postalCodeChangeHandler,
    inputBlurHandler: postalCodeBlurHandler,
    reset: postalCodeReset,
  } = useInput(isFiveChars);

  const {
    value: city,
    isValid: cityIsValid,
    hasError: cityHasError,
    valueChangeHandler: cityChangeHandler,
    inputBlurHandler: cityBlurHandler,
    reset: cityReset,
  } = useInput(isNotEmpty);

  const confirmHandler = (event) => {
    event.preventDefault();

    const formIsValid =
      nameIsValid && streetIsValid && postalCodeIsValid && cityIsValid;

    if (!formIsValid) {
      return;
    }

    const checkoutData = {
      name,
      street,
      postalCode,
      city,
    };

    props.onFormSubmit(checkoutData);
    nameReset();
    streetReset();
    postalCodeReset();
    cityReset();
  };

  const nameCtrlClasses = `${classes.control} ${
    nameHasError ? classes.invalid : ""
  }`;

  const streetCtrlClasses = `${classes.control} ${
    streetHasError ? classes.invalid : ""
  }`;

  const postalCodeCtrlClasses = `${classes.control} ${
    postalCodeHasError ? classes.invalid : ""
  }`;

  const cityCtrlClasses = `${classes.control} ${
    cityHasError ? classes.invalid : ""
  }`;

  return (
    <form className={classes.form} onSubmit={confirmHandler}>
      <div className={nameCtrlClasses}>
        <label htmlFor="name">Your Name</label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={nameChangeHandler}
          onBlur={nameBlurHandler}
        />
        {nameHasError && <p>Please enter a valid name!</p>}
      </div>
      <div className={streetCtrlClasses}>
        <label htmlFor="street">Street</label>
        <input
          type="text"
          id="street"
          value={street}
          onChange={streetChangeHandler}
          onBlur={streetBlurHandler}
        />
        {streetHasError && <p>Please enter a valid street!</p>}
      </div>
      <div className={postalCodeCtrlClasses}>
        <label htmlFor="postal">Postal Code</label>
        <input
          type="text"
          id="postal"
          value={postalCode}
          onChange={postalCodeChangeHandler}
          onBlur={postalCodeBlurHandler}
        />
        {postalCodeHasError && (
          <p>Please enter a valid postal code(5 characters long)!</p>
        )}
      </div>
      <div className={cityCtrlClasses}>
        <label htmlFor="city">City</label>
        <input
          type="text"
          id="city"
          value={city}
          onChange={cityChangeHandler}
          onBlur={cityBlurHandler}
        />
        {cityHasError && <p>Please enter a valid city!</p>}
      </div>
      <div className={classes.actions}>
        <button type="button" onClick={props.onCancel}>
          Cancel
        </button>
        <button className={classes.submit}>Confirm</button>
      </div>
    </form>
  );
};

export default Checkout;
