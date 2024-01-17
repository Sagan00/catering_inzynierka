import React, { useState, useEffect } from "react";
import { Form, Row, Col, Button, Toast, ToastContainer } from "react-bootstrap";
import axios from "axios";

const AddressChange = ({ onAddressAdded }) => {
  const [show, setShow] = useState(false);
  const [newAddress, setNewAddress] = useState({
    streetName: "",
    houseNumber: "",
    apartmentNumber: "",
    city: "",
    postalCode: "",
  });
  const [formVisible, setFormVisible] = useState(true);

  useEffect(() => {
    const userEmail = localStorage.getItem("email");

    if (userEmail) {
      axios
        .get(`http://localhost:8080/api/account/address`, {
          headers: {
            Authorization: userEmail,
          },
        })
        .then((response) => {
          const userAddress = response.data;

          if (userAddress) {
            setNewAddress(userAddress);
          }
        })
        .catch((error) => {
          console.error("Error fetching user address:", error);
        });
    }
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewAddress((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const userEmail = localStorage.getItem("email");

    if (!userEmail) {
      console.error("User email not found in localStorage");
      return;
    }

    axios
      .post(`http://localhost:8080/api/account/address`, newAddress, {
        headers: {
          Authorization: userEmail,
        },
      })
      .then((response) => {
        console.log("Address added successfully:", response.data);

        if (onAddressAdded) {
          onAddressAdded();
        }

        setShow(true);
        setFormVisible(false);
      })
      .catch((error) => {
        console.error("Error adding address:", error);
      });
  };

  return (
    <div>
      <ToastContainer
        className="p-3"
        position={"top-center"}
        style={{ zIndex: 1 }}
      >
        <Toast onClose={() => setShow(false)} show={show} delay={2000} autohide>
          <Toast.Header>
            <img
              src="holder.js/20x20?text=%20"
              className="rounded me-2"
              alt=""
            />
            <strong className="me-auto">Dodano adres</strong>
            <small>now</small>
          </Toast.Header>
        </Toast>
      </ToastContainer>
      {formVisible && (
        <Form onSubmit={handleSubmit}>
          <Col>
            <Form.Group as={Row} className="mb-3" controlId="formStreetName">
              <Form.Label column sm="3">
                Ulica:
              </Form.Label>
              <Col sm="9">
                <Form.Control
                  name="streetName"
                  value={newAddress.streetName}
                  onChange={handleInputChange}
                />
              </Col>
            </Form.Group>

            <Form.Group as={Row} className="mb-3" controlId="formHouseNumber">
              <Form.Label column sm="3">
                Numer domu:
              </Form.Label>
              <Col sm="9">
                <Form.Control
                  name="houseNumber"
                  value={newAddress.houseNumber}
                  onChange={handleInputChange}
                />
              </Col>
            </Form.Group>

            <Form.Group
              as={Row}
              className="mb-3"
              controlId="formApartmentNumber"
            >
              <Form.Label column sm="3">
                Numer mieszkania:
              </Form.Label>
              <Col sm="9">
                <Form.Control
                  name="apartmentNumber"
                  value={newAddress.apartmentNumber}
                  onChange={handleInputChange}
                />
              </Col>
            </Form.Group>

            <Form.Group as={Row} className="mb-3" controlId="formCity">
              <Form.Label column sm="3">
                Miasto:
              </Form.Label>
              <Col sm="9">
                <Form.Control
                  name="city"
                  value={newAddress.city}
                  onChange={handleInputChange}
                />
              </Col>
            </Form.Group>

            <Form.Group as={Row} className="mb-3" controlId="formPostalCode">
              <Form.Label column sm="3">
                Kod pocztowy:
              </Form.Label>
              <Col sm="9">
                <Form.Control
                  name="postalCode"
                  value={newAddress.postalCode}
                  onChange={handleInputChange}
                />
              </Col>
            </Form.Group>

            <Button type="submit" variant="primary">
              Zapisz zmiany
            </Button>
          </Col>
        </Form>
      )}
    </div>
  );
};

export default AddressChange;
