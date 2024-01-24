// MenuItem.jsx
import styles from "./styles.module.css";
import React, { forwardRef, useState, useEffect } from "react";
import { Container, Row, Col, Button, Carousel, Modal } from "react-bootstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Table from "react-bootstrap/Table";

const MenuItem = forwardRef(({ meals, category }, ref) => {
  const [selectedMeal, setSelectedMeal] = useState(null);
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalCalories, setTotalCalories] = useState(0);
  const [totalProtein, setTotalProtein] = useState(0);
  const [totalCarbo, setTotalCarbo] = useState(0);
  const [totalFat, setTotalFat] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    setSelectedMeal(null);
  }, [category]);

  useEffect(() => {
    const categoryMeals = meals.filter((meal) => meal.category === category);
    const categoryTotalPrice = categoryMeals.reduce(
      (total, meal) => total + meal.price,
      0
    );
    const categoryTotalCalories = categoryMeals.reduce(
      (total, meal) => total + meal.calories,
      0
    );
    const categoryTotalProtein = categoryMeals.reduce(
      (total, meal) => total + meal.protein,
      0
    );
    const categoryTotalCarbo = categoryMeals.reduce(
      (total, meal) => total + meal.carbo,
      0
    );
    const categoryTotalFat = categoryMeals.reduce(
      (total, meal) => total + meal.fat,
      0
    );

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

      axios
        .put("http://localhost:8080/api/order", dataToSend)
        .then((response) => {
          console.log("Data sent successfully:", response.data);
        })
        .catch((error) => {
          console.error("Error sending data:", error);
        });
      handleShow(true);
    }
  };
  const toCart = () => {
    navigate("/cart");
  };
  return (
    <div ref={ref}>
      <Container className={styles.custom_container}>
        <Row className={styles.custom_row}>
          <Col xs={12} md={6} lg={6} className={styles.red_col}>
            <div className={styles.menuDetails}>
            <div><strong>{category}</strong></div>
            <div className={styles.menuDetailsRow}><div className={styles.menuDetailsRowFirst}>Cena za 1 dzień</div><div className={styles.menuDetailsRowSecond}>{totalPrice}</div></div>
            <div className={styles.menuDetailsRow}><div className={styles.menuDetailsRowFirst}>Kalorie</div><div className={styles.menuDetailsRowSecond}>{totalCalories}</div></div>
            <div className={styles.menuDetailsRow}><div className={styles.menuDetailsRowFirst}>Białko</div><div className={styles.menuDetailsRowSecond}>{totalProtein}</div></div>
            <div className={styles.menuDetailsRow}><div className={styles.menuDetailsRowFirst}>Węglowodany</div><div className={styles.menuDetailsRowSecond}>{totalCarbo}</div></div>
            <div className={styles.menuDetailsRow}><div className={styles.menuDetailsRowFirst}>Tłuszcze</div><div className={styles.menuDetailsRowSecond}>{totalFat}</div></div>
            <Button onClick={handleSelectButtonClick}>Wybierz dietę</Button>
            </div>
            <div className={styles.slider_container}>
              <Carousel slide={false} interval={null}>
                {mealsForCategory.map((meal) => (
                  <Carousel.Item key={meal.id}>
                    <div
                      className={styles.meal_tile}
                      onClick={() => {
                        setSelectedMeal(meal);
                        setShowModal(true);
                      }}
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
          </Col>
                      
            <Modal show={showModal} onHide={clearDetails}>
              <Modal.Header closeButton>
                <Modal.Title>{selectedMeal && selectedMeal.name}</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <p>Opis: {selectedMeal && selectedMeal.description}</p>
                <p>Cena: {selectedMeal && selectedMeal.price}</p>
                <p>B: {selectedMeal && selectedMeal.protein}</p>
                <p>W: {selectedMeal && selectedMeal.carbo}</p>
                <p>T: {selectedMeal && selectedMeal.fat}</p>
                <p>Kalorie: {selectedMeal && selectedMeal.calories}</p>
                <img
                  src={
                    selectedMeal &&
                    process.env.PUBLIC_URL + "/img/" + selectedMeal.image
                  }
                  alt={selectedMeal && selectedMeal.name}
                  className={styles.selected_meal_image}
                />
              </Modal.Body>
            </Modal>
            <Modal
              show={show}
              onHide={handleClose}
              backdrop="static"
              keyboard={false}
            >
              <Modal.Header>
                <Modal.Title>Zamówienie dodano do koszyka!</Modal.Title>
              </Modal.Header>
              <Modal.Footer>
                <Button variant="secondary" onClick={toCart}>
                  Koszyk
                </Button>
              </Modal.Footer>
            </Modal>
          
        </Row>
      </Container>
    </div>
  );
});

export default MenuItem;
