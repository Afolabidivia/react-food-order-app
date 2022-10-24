import { useEffect, useState } from "react";
import Card from "../UI/Card/Card";
import styles from "./AvailableMeals.module.css";
import MealItem from "./Meal/MealItem";

const AvailableMeals = () => {
  const [meals, setMeals] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [reqError, setReqError] = useState(null);

  useEffect(() => {
    const fetchMeals = async () => {
      const response = await fetch(
        "https://react-food-delivery-app-346ec-default-rtdb.firebaseio.com/meals.json"
      );

      if (!response.ok) {
        throw new Error("Something went wrong!");
      }
      const responseData = await response.json();
      const loadedMeals = [];

      for (const key in responseData) {
        loadedMeals.push({
          id: key,
          name: responseData[key].name,
          description: responseData[key].description,
          price: responseData[key].price,
        });
      }
      setMeals(loadedMeals);
      setIsLoading(false);
    };

    fetchMeals().catch((error) => {
      setIsLoading(false);
      setReqError(error.message);
    });
  }, []);

  if (isLoading) {
    return (
      <section className={styles["meals-loading"]}>
        <p>Loading...</p>
      </section>
    );
  }

  if (reqError) {
    return (
      <section className={styles["meals-loading"]}>
        <p>{reqError}</p>
      </section>
    );
  }

  const mealsList = meals.map((meal) => (
    <MealItem
      id={meal.id}
      key={meal.id}
      name={meal.name}
      description={meal.description}
      price={meal.price}
    />
    // <li key={meal.id}>{meal.name}</li>
  ));
  return (
    <section className={styles.meals}>
      <Card>
        <ul>{mealsList}</ul>
      </Card>
    </section>
  );
};

export default AvailableMeals;
