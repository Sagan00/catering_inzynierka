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
      <Container fluid>
        <Row className={styles.custom_row}>
          <Col xs={3} className={styles.red_col}>
            <Table striped variant="danger">
              <thead>
                <tr>
                  <th colSpan={2}>{category}</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Cena za 1 dzień </td>
                  <td>{totalPrice}</td>
                </tr>
                <tr>
                  <td>Kalorie</td> <td>{totalCalories}</td>
                </tr>
                <tr>
                  <td>Białko</td> <td>{totalProtein}</td>
                </tr>
                <tr>
                  <td>Węglowodany</td> <td>{totalCarbo}</td>
                </tr>
                <tr>
                  <td>Tłuszcze</td>
                  <td>{totalFat}</td>
                </tr>
              </tbody>
              <Button onClick={handleSelectButtonClick}>Wybierz dietę</Button>
            </Table>
          </Col>
          <Col xs={9} className={styles.blue_col}>
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
            <Modal show={showModal} onHide={clearDetails}>
              <Modal.Header closeButton>
                <Modal.Title>{selectedMeal && selectedMeal.name}</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <p>{selectedMeal && selectedMeal.description}</p>
                <p>Category: {selectedMeal && selectedMeal.category}</p>
                <p>Price: {selectedMeal && selectedMeal.price}</p>
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
          </Col>
        </Row>
      </Container>
    </div>
  );
});

export default MenuItem;
