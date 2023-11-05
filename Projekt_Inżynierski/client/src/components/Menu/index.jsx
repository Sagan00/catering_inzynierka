import styles from "./styles.module.css";
import React, { useEffect, useState } from "react";
import Navigation from "../Navigation";
import Foot from "../Foot";
import "react-responsive-carousel/lib/styles/carousel.min.css";
const Menu = () => {
  const [meals, setMeals] = useState([]);
  const [selectedMeal, setSelectedMeal] = useState(null);
  useEffect(() => {
    const fetchMeals = async () => {
      try {
        const response = await fetch("http://localhost:8080/api/menu"); // Endpoint do pobierania posiłków
        if (response.ok) {
          const mealsData = await response.json();
          console.log("dane posiłków:");
          console.log(mealsData);
          setMeals(mealsData);
        } else {
          throw new Error("Failed to fetch meals");
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchMeals();
  }, []);

  const clearDetails = () => {
    setSelectedMeal(null); // Ukryj szczegóły posiłku
  };
  const [displayedIndex, setDisplayedIndex] = useState(0);
  const handleMoveLeft = () => {
    setDisplayedIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : 0));
  };

  const handleMoveRight = () => {
    setDisplayedIndex((prevIndex) =>
      prevIndex < meals.length - 3 ? prevIndex + 1 : prevIndex
    );
  };
  const displayedMeals = meals.slice(displayedIndex, displayedIndex + 3);
  return (
    <div>
      <Navigation />
      <div className={styles.main_container}>
        <h1>Menu</h1>
        <div className={styles.meals_container}>
            <div className={styles.slider_container}>
                {displayedIndex > -1 && (
                <div>
                    <button className={styles.slider_but} onClick={handleMoveLeft}>
                    &#11164;
                    </button>
                </div>
                )}
                {displayedMeals.map((meal) => (
                <div
                    key={meal.id}
                    className={styles.meal_tile}
                    onClick={() => setSelectedMeal(meal)}
                >
                    <img
                    src={process.env.PUBLIC_URL + "/img/" + meal.image}
                    alt={meal.name}
                    className={styles.meal_image}
                    />
                    <p className={styles.meal_name}>{meal.name}</p>
                </div>
                ))}
                {displayedIndex < meals.length - 2 && (
                <div>
                    <button className={styles.slider_but} onClick={handleMoveRight}>
                    &#11166;
                    </button>
                </div>
                )}
            </div>
        </div>
        {selectedMeal && (
          <div className={styles.selected_meal_cont}>
            <div className={styles.selected_meal}>
              <div>
                <h2>{selectedMeal.name}</h2>

                <p>{selectedMeal.description}</p>
                <p>Category: {selectedMeal.category}</p>
                <p>Price: {selectedMeal.price}</p>
              </div>
              <div>
                <img
                  src={process.env.PUBLIC_URL + "/img/" + selectedMeal.image}
                  alt={selectedMeal.name}
                  className={styles.selected_meal_image}
                />
              </div>
            </div>
            <button onClick={clearDetails}>X</button>
          </div>
        )}
      </div>
      <Foot />
    </div>
  );
};
export default Menu;
