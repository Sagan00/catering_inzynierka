import styles from "./styles.module.css"
import React, { useState, useEffect } from "react";
import axios from "axios";
import Navigation from "../Navigation";
import Foot from "../Foot";

const MealsList = () => {
  const [mealData, setMealData] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/mealsList");
        setMealData(response.data);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchData();
  }, []);

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div>
      <Navigation />
      <div className={styles.main_container}>
        <h2>Tabela posiłków</h2>
        <table>
          <thead>
            <tr>
              <th>Nazwa</th>
              <th>Kaloryczność</th>
            </tr>
          </thead>
          <tbody>
            {mealData.map((meal, index) => (
              <tr key={index}>
                <td>{meal.name}</td>
                <td>{meal.calories}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Foot />
    </div>
  );
};

export default MealsList;
