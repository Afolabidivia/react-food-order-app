import { Fragment } from "react";
import MealsImage from "../../assets/meals.jpg";
import styles from "./Header.module.css";
import HeaderCartButton from "./HeaderCartButton";

const Header = (props) => {
  return (
    <Fragment>
      <header className={styles.header}>
        <h1>ReactMeals</h1>
        <HeaderCartButton onClick={props.onToggleCart} />
      </header>
      <div className={styles["main-image"]}>
        <img src={MealsImage} alt="A table full of delicious food!" />
      </div>
    </Fragment>
  );
};

export default Header;
