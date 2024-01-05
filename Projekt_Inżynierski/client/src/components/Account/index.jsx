// components/Account/index.jsx
import React, { useState, useEffect } from "react";
import { Container, Button } from "react-bootstrap";
import axios from "axios";
import Navigation from "../Navigation";
import Foot from "../Foot";
import NameChange from "./NameChange";

const Account = () => {
    const [userData, setUserData] = useState(null);
    const [showForm, setShowForm] = useState(false);

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
        }
    }, []);

    const handleButtonClick = () => {
        setShowForm(!showForm);
    };

    const handleUserDataChange = (updatedUserData) => {
        setUserData(updatedUserData);
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
                <Button onClick={handleButtonClick} variant="primary">
                    Zmień imię i nazwisko
                </Button>
                {showForm && (
                    <NameChange
                        userData={userData}
                        onUserDataChange={handleUserDataChange}
                    />
                )}
            </Container>
            <Foot />
        </div>
    );
};

export default Account;
