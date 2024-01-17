// components/Account/PhoneNumberChange.jsx
import React, { useState, useEffect } from "react";
import { Form, Row, Col, Button, Toast, ToastContainer } from "react-bootstrap";
import axios from "axios";

const PhoneNumberChange = ({ userData, onUserDataChange }) => {
  const [show, setShow] = useState(false);
  const [updatedPhoneNumber, setUpdatedPhoneNumber] = useState(userData.phoneNumber);
  const [formVisible, setFormVisible] = useState(true);

  useEffect(() => {
    setUpdatedPhoneNumber(userData.phoneNumber);
  }, [userData]);

  const handleInputChange = (e) => {
    const { value } = e.target;
    setUpdatedPhoneNumber(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .put(`http://localhost:8080/api/account/${userData.email}`, { phoneNumber: updatedPhoneNumber })
      .then((response) => {
        console.log("Phone number updated successfully:", response.data);

        axios
          .get(`http://localhost:8080/api/account?email=${userData.email}`)
          .then((response) => {
            onUserDataChange(response.data);
            setShow(true);
            setFormVisible(false); // Hide the form after saving changes
          })
          .catch((error) => {
            console.error("Error refreshing data:", error);
          });
      })
      .catch((error) => {
        console.error("Error updating phone number:", error);
      });
  };

  return (
    <div>
      <ToastContainer className="p-3" position={"top-center"} style={{ zIndex: 1 }}>
        <Toast onClose={() => setShow(false)} show={show} delay={2000} autohide>
          <Toast.Header>
            <img src="holder.js/20x20?text=%20" className="rounded me-2" alt="" />
            <strong className="me-auto">Zaktualizowano numer telefonu</strong>
            <small>now</small>
          </Toast.Header>
        </Toast>
      </ToastContainer>
      {formVisible && (
        <Form onSubmit={handleSubmit}>
          <Col>
            <Form.Group as={Row} className="mb-3" controlId="formPhoneNumber">
              <Form.Label column sm="3">
                Numer telefonu:
              </Form.Label>
              <Col sm="9">
                <Form.Control
                  name="phoneNumber"
                  value={updatedPhoneNumber}
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

export default PhoneNumberChange;
