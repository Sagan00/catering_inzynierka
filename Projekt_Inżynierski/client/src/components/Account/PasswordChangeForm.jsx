// components/Account/PasswordChangeForm.jsx
import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import axios from "axios";
import styles from "./styles.module.css";

const PasswordChangeForm = () => {
  const [formData, setFormData] = useState({
    oldPassword: "",
    newPassword: "",
  });

  const [error, setError] = useState("");

  const handleChange = ({ target }) => {
    setFormData({ ...formData, [target.name]: target.value });
  };

  const isPasswordValid = (password) => {
    const regex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return regex.test(password);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const userEmail = localStorage.getItem("email");

      if (!isPasswordValid(formData.newPassword)) {
        setError(
          "Hasło musi składać się z conajmniej 8 znaków, zaczynać się z wielkiej litery i zawierać cyfrę oraz znak specjalny"
        );
        return;
      }

      const response = await axios.put(
        `http://localhost:8080/api/account/changePassword/${userEmail}`,
        { ...formData }
      );

      setError("");
      setFormData({ oldPassword: "", newPassword: "" });

      // Optionally, you can show a success message or redirect the user
      console.log(response.data.message);
    } catch (error) {
      if (
        error.response &&
        error.response.status >= 400 &&
        error.response.status <= 500
      ) {
        setError(error.response.data.message);
      }
    }
  };

  return (
    <Form onSubmit={handleSubmit} className={styles.passwordForm}>
      <Form.Group controlId="oldPassword">
        <Form.Label>Stare hasło</Form.Label>
        <Form.Control
          type="password"
          name="oldPassword"
          value={formData.oldPassword}
          onChange={handleChange}
          required
        />
      </Form.Group>
      <Form.Group controlId="newPassword">
        <Form.Label>Nowe hasło</Form.Label>
        <Form.Control
          type="password"
          name="newPassword"
          value={formData.newPassword}
          onChange={handleChange}
          required
        />
      </Form.Group>
      {error && <div className={styles.error_msg}>{error}</div>}
      <Button type="submit" variant="primary">
        Zmień hasło
      </Button>
    </Form>
  );
};

export default PasswordChangeForm;
