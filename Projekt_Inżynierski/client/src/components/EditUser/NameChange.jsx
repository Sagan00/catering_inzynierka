// UserDataForm.js
import React, { useState, useEffect } from "react";
import { Form, Row, Col, Button } from "react-bootstrap";
import { Container, Toast, ToastContainer } from "react-bootstrap";
import axios from "axios";

const NameChange = ({ userData, onUserDataChange }) => {
  const [show, setShow] = useState(false);
  const [updatedUserData, setUpdatedUserData] = useState({
    firstName: userData.firstName,
    lastName: userData.lastName,
    email: userData.email,
  });

  useEffect(() => {
    setUpdatedUserData(userData);
  }, [userData]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedUserData((prevData) => ({ ...prevData, [name]: value }));
  };
  

  const handleSubmit = (e) => {
    e.preventDefault();

    // Wysyłamy zaktualizowane dane na backend
    axios
      .put(`http://localhost:8080/api/user/${userData.email}`, updatedUserData)
      .then((response) => {
        console.log("Data updated successfully:", response.data);

        // Jeśli potrzebujesz zaktualizować dane w komponencie nadrzędnym, użyj callbacka
        onUserDataChange(updatedUserData);
        setShow(true);
      })
      .catch((error) => {
        console.error("Error updating data:", error);
      });
  };

  return (
    <div>
      <ToastContainer
        className="p-3"
        position={"top-center"}
        style={{ zIndex: 1 }}
      >
        <Toast onClose={() => window.location.reload()} show={show} delay={2000} autohide>
        <Toast.Header>
            <img
              src="holder.js/20x20?text=%20"
              className="rounded me-2"
              alt=""
            />
            <strong className="me-auto">Zaktualizowano Dane</strong>
            <small>now</small>
          </Toast.Header>
        </Toast>
      </ToastContainer>
      <Form onSubmit={handleSubmit}>
        <Col>
          <Form.Group as={Row} className="mb-3" controlId="formFirstName">
            <Form.Label column sm="3">
              First Name:
            </Form.Label>
            <Col sm="9">
              <Form.Control
                name="firstName"
                value={updatedUserData.firstName}
                onChange={handleInputChange}
              />
            </Col>
          </Form.Group>

          <Form.Group as={Row} className="mb-3" controlId="formLastName">
            <Form.Label column sm="3">
              Last Name:
            </Form.Label>
            <Col sm="9">
              <Form.Control
                name="lastName"
                value={updatedUserData.lastName}
                onChange={handleInputChange}
              />
            </Col>
          </Form.Group>

          <Button type="submit" variant="primary">
            Zapisz zmiany
          </Button>
        </Col>
      </Form>
    </div>
  );
};

export default NameChange;
