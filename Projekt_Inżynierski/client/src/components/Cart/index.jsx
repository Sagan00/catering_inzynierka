import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState, useEffect } from "react";
import axios from "axios";
import DatePicker from "react-datepicker";
import { useNavigate } from "react-router-dom";
import "react-datepicker/dist/react-datepicker.css";
import { MDBCard, MDBCardBody, MDBCardImage, MDBCol, MDBContainer, MDBRow } from "mdb-react-ui-kit";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

const Cart = () => {
  const [userOrders, setUserOrders] = useState(null);
  const [error, setError] = useState(null);
  const [selectedStartDate, setSelectedStartDate] = useState();
  const [selectedEndDate, setSelectedEndDate] = useState();
  const [totalCost, setTotalCost] = useState(0);
  const [daysDiff, setDaysDiff] = useState(0);
  const [mealNames, setMealNames] = useState(null);
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    const storedEmail = localStorage.getItem("email");
    fetchUserOrders(storedEmail);
  }, []);
  useEffect(() => {
    const timeDiff = selectedEndDate - selectedStartDate;
    const newDaysDiff = Math.ceil(timeDiff / (1000 * 60 * 60 * 24) + 1);
    if (newDaysDiff > 0) {
      setDaysDiff(newDaysDiff);
    } else {
      setDaysDiff(0);
    }

    if (newDaysDiff > 0) {
      updateTotalCost(newDaysDiff);
    }
  }, [selectedStartDate, selectedEndDate]);
  useEffect(() => {
    if (userOrders && userOrders.length > 0) {
      const idOrder = userOrders[0].id;
      fetchMenuNames(idOrder);
    }
  }, [userOrders]);

  const updateTotalCost = async (days) => {
    if (userOrders && userOrders.length > 0) {
      const newTotalCost = userOrders[0].total_cost * days;
      console.log(userOrders[0].total_cost);
      setTotalCost(newTotalCost);
    }
  };

  const fetchUserOrders = (email) => {
    if (!email) {
      setError("Email not found in local storage.");
      return;
    }

    axios
      .post("http://localhost:8080/api/order/user_order", { email_1: email })
      .then((response) => {
        setUserOrders(response.data.userOrders);
        setError(null);
      })
      .catch((error) => {
        console.error("Error fetching orders:", error);
        setUserOrders(null);
        setError("Error fetching orders. Please try again.");
      });
  };
  const fetchMenuNames = (idOrder) => {
    axios
      .post("http://localhost:8080/api/cart_meals", { id_order: idOrder })
      .then((response) => {
        const mealNames = response.data;
        setMealNames(mealNames);
      })
      .catch((error) => {
        console.error("Error fetching menu names:", error);
      });
  };
  const deleteOrder = async () => {
    try {
      if (userOrders && userOrders.length > 0) {
        const orderIdToDelete = userOrders[0].id;

        await axios.delete(
          `http://localhost:8080/api/order/${orderIdToDelete}`
        );
      }
    } catch (error) {
      console.error("Error deleting order:", error);
    }
    navigate("/menu");
  };
  const updateOrder = async (selectedStartDate, selectedEndDate, totalCost) => {
    try {
      if (userOrders && userOrders.length > 0) {
        const orderIdToUpdate = userOrders[0].id;
        selectedStartDate.setHours(6, 0, 0, 0);
        selectedEndDate.setHours(6, 0, 0, 0);
        const dataToSend = {
          id_order: orderIdToUpdate,
          total_cost: totalCost,
          start_date: selectedStartDate,
          end_date: selectedEndDate,
        };

        await axios.put("http://localhost:8080/api/order/update", dataToSend);
      }
    } catch (error) {
      console.error("Error updating order:", error);
    }
  };
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);

  return (
    <div>
      {userOrders && userOrders.length === 0 && <p>Twój koszyk jest pusty.</p>}

      {error && <p style={{ color: "red" }}>{error}</p>}

      {userOrders && userOrders.length > 0 && (
        <section className="vh-100" style={{ backgroundColor: "pink" }}>
          <MDBContainer className="h-100">
            <MDBRow className="justify-content-center align-items-center h-100">
              <MDBCol>
                <p>
                  <span className="h2">
                    Twoje zamówienie to {mealNames?.menu_name}{" "}
                  </span>
                </p>

                <MDBCard className="mb-4">
                  <MDBCardBody className="p-4">
                    <MDBRow className="align-items-center">
                      <MDBCol md="2" className="d-flex justify-content-center">
                        <div>
                          <p className="small text-muted mb-4 pb-2">Name</p>
                          <p className="lead fw-normal mb-0">
                            {mealNames?.menu_name}
                          </p>
                        </div>
                      </MDBCol>
                      <MDBCol md="2" className="d-flex justify-content-center">
                        <div>
                          <p className="small text-muted mb-4 pb-2">
                            Śniadanie
                          </p>
                          <MDBCardImage
                            fluid
                            src={
                              process.env.PUBLIC_URL +
                              "/img/" +
                              mealNames?.breakfast_img
                            }
                            alt={mealNames?.breakfast}
                          />
                          <p className="lead fw-normal mb-0">
                            {mealNames?.breakfast}
                          </p>
                        </div>
                      </MDBCol>
                      <MDBCol md="2" className="d-flex justify-content-center">
                        <div>
                          <p className="small text-muted mb-4 pb-2">
                            Drugie śniadanie
                          </p>
                          <MDBCardImage
                            fluid
                            src={
                              process.env.PUBLIC_URL +
                              "/img/" +
                              mealNames?.secondBreakfast_img
                            }
                            alt={mealNames?.secondBreakfast}
                          />
                          <p className="lead fw-normal mb-0">
                            {mealNames?.secondBreakfast}
                          </p>
                        </div>
                      </MDBCol>
                      <MDBCol md="2" className="d-flex justify-content-center">
                        <div>
                          <p className="small text-muted mb-4 pb-2">Lunch</p>
                          <MDBCardImage
                            fluid
                            src={
                              process.env.PUBLIC_URL +
                              "/img/" +
                              mealNames?.lunch_img
                            }
                            alt={mealNames?.lunch}
                          />
                          <p className="lead fw-normal mb-0">
                            {mealNames?.lunch}
                          </p>
                        </div>
                      </MDBCol>
                      <MDBCol md="2" className="d-flex justify-content-center">
                        <div>
                          <p className="small text-muted mb-4 pb-2">Obiad</p>
                          <MDBCardImage
                            fluid
                            src={
                              process.env.PUBLIC_URL +
                              "/img/" +
                              mealNames?.dinner_img
                            }
                            alt={mealNames?.dinenr}
                          />
                          <p className="lead fw-normal mb-0">
                            {mealNames?.dinner}
                          </p>
                        </div>
                      </MDBCol>
                      <MDBCol md="2" className="d-flex justify-content-center">
                        <div>
                          <p className="small text-muted mb-4 pb-2">Kolacja</p>
                          <MDBCardImage
                            fluid
                            src={
                              process.env.PUBLIC_URL +
                              "/img/" +
                              mealNames?.supper_img
                            }
                            alt={mealNames?.supper}
                          />
                          <p className="lead fw-normal mb-0">
                            {mealNames?.supper}
                          </p>
                        </div>
                      </MDBCol>
                    </MDBRow>
                  </MDBCardBody>
                </MDBCard>

                <MDBCard className="mb-5">
                  <MDBCardBody className="p-4">
                    <MDBRow className="align-items-center">
                      <MDBCol md="4" className="d-flex justify-content-center">
                        <div>
                          <p className="small text-muted mb-4 pb-2">
                            Data Początkowa
                          </p>
                          <p className="lead fw-normal mb-0">
                            <DatePicker
                              placeholderText={"Please select a date"}
                              selected={selectedStartDate}
                              onChange={(date) => setSelectedStartDate(date)}
                              minDate={tomorrow}
                            />
                          </p>
                        </div>
                      </MDBCol>
                      <MDBCol md="4" className="d-flex justify-content-center">
                        <div>
                          <p className="small text-muted mb-4 pb-2">
                            Data Końcowa
                          </p>
                          <p className="lead fw-normal mb-0">
                            <DatePicker
                              placeholderText={"Please select a date"}
                              selected={selectedEndDate}
                              onChange={(date) => setSelectedEndDate(date)}
                              minDate={tomorrow}
                            />
                          </p>
                        </div>
                      </MDBCol>
                      <MDBCol md="2" className="d-flex justify-content-center">
                        <div>
                          <p className="small text-muted mb-4 pb-2">
                            Dni łącznie{" "}
                          </p>
                          <p className="lead fw-normal mb-0"> {daysDiff}</p>
                        </div>
                      </MDBCol>
                      <MDBCol md="2" className="d-flex justify-content-center">
                        <div className="float-end">
                          <p className="mb-0 me-5 d-flex align-items-center">
                            <span className="small text-muted me-2">
                              Do zapłaty:
                            </span>
                            <span className="lead fw-normal">
                              {totalCost.toFixed(2)}
                            </span>
                          </p>
                        </div>
                      </MDBCol>
                    </MDBRow>
                  </MDBCardBody>
                </MDBCard>

                <div className="d-flex">
                  <Button className="me-2" onClick={deleteOrder}>
                    Zmień wybór
                  </Button>
                  <Button
                    className="me-2"
                    onClick={handleShow} >
                    Podsumowanie
                  </Button>
                </div>
              </MDBCol>
            </MDBRow>
          </MDBContainer>
        </section>
      )}
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Potwierdź zamówienie</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <div className="row">
          <div className="col-9">
            <div>Imię:</div> 
            <div>Nazwisko:</div> 
            <div>Adres:</div>
          </div>
          <div className="col-3">
          <p>
            <strong>Cena:</strong> {totalCost}
          </p>
          <Button variant="primary" onClick={() => updateOrder(selectedStartDate, selectedEndDate, totalCost)}>
            Płatność
          </Button>
        </div>
      </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Anuluj
          </Button>
          
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Cart;
