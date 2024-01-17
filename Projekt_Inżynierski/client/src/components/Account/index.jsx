// components/Account/index.jsx
import React, { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "axios";
import styles from "./styles.module.css";
import Navigation from "../Navigation";
import Foot from "../Foot";
import NameChange from "./NameChange";
import AddressChange from "./AddressChange";
import PhoneNumberChange from "./PhoneNumberChange";

const Account = () => {
  const [userData, setUserData] = useState(null);
  const [userAddress, setUserAddress] = useState(null);

  const [showNameForm, setShowNameForm] = useState(false);
  const [showAddressForm, setShowAddressForm] = useState(false);
  const [showPhoneNumberForm, setShowPhoneNumberForm] = useState(false);

  useEffect(() => {
    const userEmail = localStorage.getItem("email");

    if (userEmail) {
      axios
        .get(`http://localhost:8080/api/account?email=${userEmail}`)
        .then((response) => {
          setUserData(response.data);
        })
        .catch((error) => {
          console.error("Error:", error);
        });

      // Pobierz dane adresowe
      axios
        .get(`http://localhost:8080/api/account/address`, {
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

  const handlePhoneNumberButtonClick = () => {
    setShowPhoneNumberForm(!showPhoneNumberForm);
  };

  const handleUserDataChange = (updatedUserData) => {
    setUserData(updatedUserData);
  };

  const handleAddressAdded = () => {
    // Aktualizuj dane adresowe po dodaniu/adresie
    axios
      .get(`http://localhost:8080/api/account/address`, {
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
      <div className={styles.main_container}>
        <div className={styles.content}>
          <div className={styles.informationContainer}>
            <h1>Twoje dane</h1>
            {userData && (
              <div>
                <p>
                  Imię i nazwisko: {userData.firstName} {userData.lastName}
                </p>
                <p>Email: {userData.email}</p>
                {userData.phoneNumber && (
                  <p>Numer telefonu: {userData.phoneNumber}</p>
                )}
              </div>
            )}
            {userAddress && (
              <div>
                <p>
                  Adres: {userAddress.streetName} {userAddress.houseNumber},{" "}
                  {userAddress.apartmentNumber}
                </p>
                <p>Miasto: {userAddress.city}</p>
                <p>Kod pocztowy: {userAddress.postalCode}</p>
              </div>
            )}
            <Button onClick={handleNameButtonClick} variant="primary">
              Zmień imię i nazwisko
            </Button>
            <Button onClick={handlePhoneNumberButtonClick} variant="primary">
              Zmień numer telefonu
            </Button>
            <Button onClick={handleAddressButtonClick} variant="primary">
              Dodaj lub zmień adres
            </Button>
            <Link to="/orderHistory">
              <Button variant="primary">Historia zamówień</Button>
            </Link>
          </div>
          <div className={styles.formContainer}>
            {showNameForm && (
              <NameChange
                userData={userData}
                onUserDataChange={handleUserDataChange}
              />
            )}
            {showPhoneNumberForm && (
              <PhoneNumberChange
                userData={userData}
                onUserDataChange={handleUserDataChange}
              />
            )}
            {showAddressForm && (
              <AddressChange onAddressAdded={handleAddressAdded} />
            )}
          </div>
        </div>
      </div>
      <Foot />
    </div>
  );
};

export default Account;
