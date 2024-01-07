// components/Account/index.jsx
import React, { useState, useEffect } from "react";
import { Container, Button } from "react-bootstrap";
import axios from "axios";
import styles from "./styles.module.css";
import Navigation from "../Navigation";
import Foot from "../Foot";
import NameChange from "./NameChange";
import AddressChange from "./AddressChange";

const Account = () => {
  const [userData, setUserData] = useState(null);
  const [userAddress, setUserAddress] = useState(null); // Dodaj stan dla danych adresowych

  const [showNameForm, setShowNameForm] = useState(false);
  const [showAddressForm, setShowAddressForm] = useState(false);

  useEffect(() => {
    const userEmail = localStorage.getItem("email");

    if (userEmail) {
      axios
        .get(`http://localhost:8080/api/user?email=${userEmail}`)
        .then((response) => {
          setUserData(response.data);
        })
        .catch((error) => {
          console.error("Error:", error);
        });

      // Pobierz dane adresowe
      axios
        .get(`http://localhost:8080/api/user/address`, {
          headers: {
            Authorization: userEmail,
          },
        })
        .then((response) => {
          setUserAddress(response.data);
        })
        .catch((error) => {
          console.error("Error fetching user address:", error);
        });
    }
  }, []);

  const handleNameButtonClick = () => {
    setShowNameForm(!showNameForm);
  };

  const handleAddressButtonClick = () => {
    setShowAddressForm(!showAddressForm);
  };

  const handleUserDataChange = (updatedUserData) => {
    setUserData(updatedUserData);
  };

  const handleAddressAdded = () => {
    // Aktualizuj dane adresowe po dodaniu/adresie
    axios
      .get(`http://localhost:8080/api/user/address`, {
        headers: {
          Authorization: localStorage.getItem("email"),
        },
      })
      .then((response) => {
        setUserAddress(response.data);
      })
      .catch((error) => {
        console.error("Error fetching user address:", error);
      });
  };

  return (
    <div>
      <Navigation />
      <Container>
        <h1>Twoje dane</h1>
        {userData && (
          <div>
            <p>Imię: {userData.firstName}</p>
            <p>Nazwisko: {userData.lastName}</p>
            <p>Email: {userData.email}</p>
          </div>
        )}
        {userAddress && (
          <div>
            <p>Ulica: {userAddress.streetName}</p>
            <p>Numer domu: {userAddress.houseNumber}</p>
            <p>Numer mieszkania: {userAddress.apartmentNumber}</p>
            <p>Miasto: {userAddress.city}</p>
            <p>Kod pocztowy: {userAddress.postalCode}</p>
          </div>
        )}
        <Button onClick={handleNameButtonClick} variant="primary">
          Zmień imię i nazwisko
        </Button>
        {showNameForm && (
          <NameChange
            userData={userData}
            onUserDataChange={handleUserDataChange}
          />
        )}
        <Button onClick={handleAddressButtonClick} variant="primary">
          Dodaj lub zmień adres
        </Button>
        {showAddressForm && <AddressChange onAddressAdded={handleAddressAdded} />}
      </Container>
      <Foot />
    </div>
  );
};

export default Account;
