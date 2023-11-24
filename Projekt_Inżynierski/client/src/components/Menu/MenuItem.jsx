// MenuItem.jsx
import styles from "./styles.module.css";
import React, { forwardRef, useState, useEffect } from "react";
import { Container, Row, Col, Button, Carousel, Modal } from "react-bootstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";


const MenuItem = forwardRef(({ meals, category}, ref) => {
  const [selectedMeal, setSelectedMeal] = useState(null);
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalCalories, setTotalCalories] = useState(0);
  const [totalProtein, setTotalProtein] = useState(0);
  const [totalCarbo, setTotalCarbo] = useState(0);
  const [totalFat, setTotalFat] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();
  //const [responseOrder, setresponseOrder] = useState("Brak informacji o zmianie zamówienia!");

  useEffect(() => {
    // Reset index i wybraną potrawę po zmianie kategorii
    setSelectedMeal(null);
  }, [category]);

  useEffect(() => {
    // Oblicz sumę pól 'price' i 'calories' dla potraw w danej kategorii
    const categoryMeals = meals.filter((meal) => meal.category === category);
    const categoryTotalPrice = categoryMeals.reduce((total, meal) => total + meal.price, 0);
    const categoryTotalCalories = categoryMeals.reduce((total, meal) => total + meal.calories, 0);
    const categoryTotalProtein = categoryMeals.reduce((total, meal) => total + meal.protein, 0);
    const categoryTotalCarbo = categoryMeals.reduce((total, meal) => total + meal.carbo, 0);
    const categoryTotalFat = categoryMeals.reduce((total, meal) => total + meal.fat, 0);

    setTotalPrice(categoryTotalPrice.toFixed(2));
    setTotalCalories(categoryTotalCalories);
    setTotalProtein(categoryTotalProtein);
    setTotalCarbo(categoryTotalCarbo);
    setTotalFat(categoryTotalFat);
  }, [meals, category]);

  if (!meals || !Array.isArray(meals)) {
    return null;
  }

  const mealsForCategory = meals.filter((meal) => meal.category === category);

  const clearDetails = () => {
    setSelectedMeal(null);
    setShowModal(false);
  };
  
  const handleSelectButtonClick = () => {
  const userEmail = localStorage.getItem("email");

  if (userEmail) {
    const dataToSend = {
      totalPrice_1: totalPrice,
      category_1: category,
      email_1: userEmail,
    };
    
    
    axios.put('http://localhost:8080/api/order', dataToSend)
      .then((response) => {
        console.log('Data sent successfully:', response.data);
      })
      .catch((error) => {
        console.error('Error sending data:', error);
        // Możesz dodać obsługę błędu, np. wyświetlenie komunikatu o błędzie
      })
      navigate('/cart');
  }
};
  return (
    <div ref={ref}>
      <Container fluid>
        <Row className={styles.custom_row}>
          <Col xs={3} className={styles.red_col}>
            <p>{category}</p>
            <p>Total Price: {totalPrice}</p>
            <p>Total Calories: {totalCalories}</p>
            <p>Total Protein: {totalProtein}</p>
            <p>Total Carbo: {totalCarbo}</p>
            <p>Total Fat: {totalFat}</p>
            <Button onClick={handleSelectButtonClick}>Wybierz dietę</Button>
          </Col>
          <Col xs={9} className={styles.blue_col}>
            <div className={styles.slider_container}>
            <Carousel  slide={false} interval={null}>
            {mealsForCategory.map((meal) => (
              <Carousel.Item key={meal.id}>
                <div
                  className={styles.meal_tile}
                  onClick={() =>{
                    setSelectedMeal(meal);
                    setShowModal(true);
                  } }
                >
                  <img
                    src={process.env.PUBLIC_URL + "/img/" + meal.image}
                    alt={meal.name}
                    className={styles.meal_image}
                  />
                </div>
              </Carousel.Item>
               ))}
            </Carousel>
            </div>
            <Modal show={showModal} onHide={clearDetails}>
              <Modal.Header closeButton>
                <Modal.Title>{selectedMeal && selectedMeal.name}</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <p>{selectedMeal && selectedMeal.description}</p>
                <p>Category: {selectedMeal && selectedMeal.category}</p>
                <p>Price: {selectedMeal && selectedMeal.price}</p>
                {/* Dodaj inne szczegóły potrawy według potrzeb */}
                <img
                  src={selectedMeal && process.env.PUBLIC_URL + "/img/" + selectedMeal.image}
                  alt={selectedMeal && selectedMeal.name}
                  className={styles.selected_meal_image}
                />
              </Modal.Body>
            </Modal>
          </Col>
        </Row>
      </Container>
    </div>
  );
});

export default MenuItem;
