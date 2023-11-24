import styles from "./styles.module.css";
import React, { useState, useEffect } from "react";
import Navigation from "../Navigation";
import Foot from "../Foot";
import axios from "axios";
import { Container, Button } from "react-bootstrap";
import NameChange from "./NameChange";

const EditUser = () => {
  const [userData, setUserData] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const handleButtonClick = () => {
    if (showForm) {
      setShowForm(false);
    } else {
      setShowForm(true);
    }
  };
  useEffect(() => {
    const userEmail = localStorage.getItem("email");

    if (userEmail) {
      axios
        .get(`http://localhost:8080/api/user/${userEmail}`)
        .then((response) => {
          setUserData(response.data);
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }
  }, []);

  const handleUserDataChange = (updatedUserData) => {
    setUserData(updatedUserData);
  };

  return (
    <div>
      <Navigation />
      <Container>
        <h1>Twoje dane</h1>
        {showForm && (
          <NameChange
            userData={userData}
            onUserDataChange={handleUserDataChange}
          />
        )}
        <Button onClick={handleButtonClick} variant="primary">
          Zmień imie i nazwisko
        </Button>
      </Container>
      <Foot />
    </div>
  );
};

export default EditUser;
