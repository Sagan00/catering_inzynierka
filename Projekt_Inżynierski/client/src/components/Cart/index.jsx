// Cart.jsx
import styles from "./styles.module.css";
import Navigation from "../Navigation";
import Foot from "../Foot";
import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState, useEffect } from "react";
import { Container, Row, Col, ListGroup } from "react-bootstrap";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const Cart = () => {
  const [userEmail, setUserEmail] = useState("");
  const [userOrders, setUserOrders] = useState(null);
  const [error, setError] = useState(null);
  const [selectedStartDate, setSelectedStartDate] = useState(new Date());
  const [selectedEndDate, setSelectedEndDate] = useState(new Date());
  const [totalCost, setTotalCost] = useState(0);
  const [daysDiff, setDaysDiff] = useState(0);

  useEffect(() => {
    // Pobierz e-mail z local storage po załadowaniu komponentu
    const storedEmail = localStorage.getItem("email");
    setUserEmail(storedEmail);

    // Pobierz dane użytkownika od razu po załadowaniu komponentu
    fetchUserOrders(storedEmail);
  }, []);

  useEffect(() => {
    // Oblicz różnicę dni i koszt po zmianie daty końcowej
    const timeDiff = selectedEndDate - selectedStartDate;
    const newDaysDiff = Math.ceil(timeDiff / (1000 * 60 * 60 * 24) + 1);
    setDaysDiff(newDaysDiff);

    if (newDaysDiff > 0) {
      updateTotalCost(newDaysDiff);
    }
  }, [selectedStartDate, selectedEndDate]);

  const updateTotalCost = async (days) => {
    if (userOrders && userOrders.length > 0) {
      const newTotalCost = userOrders[0].total_cost * days;
      setTotalCost(newTotalCost);
    }
  };

  const fetchUserOrders = (email) => {
    if (!email) {
      setError("Email not found in local storage.");
      return;
    }

    axios.post("http://localhost:8080/api/order/user_order", { email_1: email })
      .then((response) => {
        setUserOrders(response.data.userOrders);
        setError(null);
      })
      .catch((error) => {
        console.error('Error fetching orders:', error);
        setUserOrders(null);
        setError("Error fetching orders. Please try again.");
      });
  };


  return (
    <div>
      <Navigation />
      <div className={styles.main_container}>
        <h1>Koszyk</h1>
        {userOrders == null && (
          <p>Twój koszyk jest pusty.</p>
        )}

        {error && <p style={{ color: 'red' }}>{error}</p>}

        {userOrders && userOrders.length > 0 && (
          <div>
            <ListGroup>
              {userOrders.map((order) => {
                const startDate = new Date(order.start_date);
                const endDate = new Date(order.end_date);
                

                return (
                  <ListGroup.Item key={order.id}>
                    <Container>
                      <Col><p>Email: {userEmail}</p></Col>
                      <Col>ID: {order.id}</Col>
                      <Col>Koszt całkowity: {totalCost}</Col>
                      <Col>Data początkowa: <DatePicker selected={selectedStartDate} onChange={(date) => setSelectedStartDate(date)} /></Col>
                      <Col>Data końcowa: <DatePicker selected={selectedEndDate} onChange={(date) => setSelectedEndDate(date)} minDate={selectedStartDate} /></Col>
                      <Col>Dni łącznie: {daysDiff}</Col>
                    </Container>
                  </ListGroup.Item>
                );
              })}
            </ListGroup>
          </div>
        )}
      </div>
      <Foot />
    </div>
  );
};

export default Cart;
