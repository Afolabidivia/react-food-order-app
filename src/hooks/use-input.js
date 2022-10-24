import { useReducer } from "react";

const initialInputState = {
  value: "",
  isTouched: false,
};
const inputStateReducer = (state, action) => {
  if (action.type === "INPUT_VALUE") {
    return {
      value: action.value,
      isTouched: state.isTouched,
    };
  }

  if (action.type === "INPUT_TOCUHED") {
    return {
      value: state.value,
      isTouched: action.value,
    };
  }

  return initialInputState;
};

const useInput = (validateValue) => {
  //   const [enteredValue, setEnteredValue] = useState("");
  //   const [isTouched, setIsTouched] = useState(false);

  const [inputState, dispatch] = useReducer(
    inputStateReducer,
    initialInputState
  );

  const valueIsValid = validateValue(inputState.value);
  const hasError = !valueIsValid && inputState.isTouched;

  const valueChangeHandler = (event) => {
    // setEnteredValue(event.target.value);
    dispatch({ type: "INPUT_VALUE", value: event.target.value });
  };

  const inputBlurHandler = (event) => {
    dispatch({ type: "INPUT_TOCUHED", value: true });
    //  setIsTouched(true);
  };

  const reset = () => {
    // setEnteredValue("");
    // setIsTouched(false);

    dispatch({ type: "INPUT_VALUE", value: "" });
    dispatch({ type: "INPUT_TOCUHED", value: false });
  };

  return {
    value: inputState.value,
    isValid: valueIsValid,
    hasError,
    valueChangeHandler,
    inputBlurHandler,
    reset,
  };
};

export default useInput;
