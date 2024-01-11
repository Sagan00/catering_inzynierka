// components/ContactForm.js
import styles from "./styles.module.css";
import React, { useState } from "react";
import axios from "axios";
import Navigation from "../Navigation";
import Foot from "../Foot";

const ContactForm = () => {
  const [formData, setFormData] = useState({
    topic: "",
    description: "",
    confirmation: false,
  });

  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:8080/api/contactForm",
        formData,
        {
          headers: {
            Authorization: localStorage.getItem("email"),
          },
        }
      );

      console.log("Form data saved:", response.data);

      setSubmitSuccess(true);
      setFormData({
        topic: "",
        description: "",
        confirmation: false,
      });
    } catch (error) {
      console.error("Error saving form data:", error.message);
    }
  };

  return (
    <div>
      <Navigation />
      <div className={styles.main_container}>
        <div className={styles.content}>
          <div className={styles.formContainer}>
            <h2>Formularz kontaktowy</h2>
            {submitSuccess && (
              <p style={{ color: "green" }}>
                Wiadomość została wysłana prawidłowo!
              </p>
            )}
            <form onSubmit={handleSubmit}>
              <label>
                Temat:
                <input
                  type="text"
                  name="topic"
                  value={formData.topic}
                  onChange={handleChange}
                  required
                />
              </label>
              <label>
                Opis:
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows="4"
                  required
                />
              </label>
              <label className={styles.checkboxLabel}>
                <input
                  className={styles.checkboxInput}
                  type="checkbox"
                  name="confirmation"
                  checked={formData.confirmation}
                  onChange={handleChange}
                  required
                />
                <span>
                  Zapoznałem się z polityką prywatności i akceptuję warunki
                  dotyczące przetwarzania moich danych osobowych.*
                </span>
              </label>
              <br />
              <button type="submit">Wyślij</button>
            </form>
          </div>
          <div className={styles.imageContainer}>
            <img
              src="/img/mapaGoogle.png"
              alt="Mapa Google"
              width="600"
              height="510"
            />
          </div>
        </div>
      </div>
      <Foot />
    </div>
  );
};

export default ContactForm;
