// Cart.jsx
import styles from "./styles.module.css";
import React, { useEffect, useState, useRef } from "react";
import Navigation from "../Navigation";
import Foot from "../Foot";
import MenuItem from "./MenuItem";
import { Nav } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const Menu = () => {
  const menuItemRefs = useRef([
    React.createRef(),
    React.createRef(),
    React.createRef(),
  ]);
  const scrollToMenuItem = (index) => {
      if (menuItemRefs.current[index] && menuItemRefs.current[index].current) {
        menuItemRefs.current[index].current.scrollIntoView({ behavior: "smooth" });
      }
    };

  
  const [selectedCategoryIndex, setSelectedCategoryIndex] = useState(0);
  const [meals, setMeals] = useState([]);
  useEffect(() => {
    const fetchMeals = async () => {
      try {
        const response = await fetch("http://localhost:8080/api/menu");
        if (response.ok) {
          const mealsData = await response.json();
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


  const uniqueCategories = Array.from(
    new Set(meals.map((meal) => meal.category))
  );

  return (
    <div>
      <Navigation />
      <div className={styles.main_container}>
        <h1>Sprawdź co dla ciebie<br/> przygotowaliśmy</h1>
        <img src={process.env.PUBLIC_URL + "/img/tlo.jpg"} alt="tlo"/>
        <div className={styles.navContainer}>
          <Nav fill >
            {uniqueCategories.map((category, index) => (
              <Nav.Item key={category} className={styles.navItem}>
                <Nav.Link onClick={() => {
                    scrollToMenuItem(index);
                    setSelectedCategoryIndex(index);
                  }}
                  
                >
                  {category}
                </Nav.Link>
              </Nav.Item>
            ))}
          </Nav>
        </div>
        {menuItemRefs.current.map((ref, index) => (
          <MenuItem
            key={index}
            ref={ref}
            meals={meals}
            category={uniqueCategories[index]}
            showSlider={index === selectedCategoryIndex}
          />
        ))}
      </div>
      <Foot />
    </div>
  );
};

export default Menu;
