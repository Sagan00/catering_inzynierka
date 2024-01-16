// Panel.js
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./styles.module.css";
import Navigation from "../Navigation";
import Foot from "../Foot";
import axios from "axios";
import {Modal, Button, Form} from 'react-bootstrap';

const Panel = () => {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();
  const [isContentVisible, setIsContentVisible] = useState(false);
  const [mealData, setMealData] = useState([]);
  const [error, setError] = useState(null);
  const [selectedMeal, setSelectedMeal] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const toggleContentVisibility = () => {
    setIsContentVisible(!isContentVisible);
  };

  useEffect(() => {
    fetchUsers();
  }, []);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/mealsList");
        setMealData(response.data);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchData();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/panel/users");
      setUsers(response.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const handleDeleteUser = async (userId) => {
    try {
      // Wywołaj API do usunięcia użytkownika
      await axios.delete(`http://localhost:8080/api/panel/users/${userId}`);
  
      // Pobierz ponownie listę użytkowników po usunięciu
      fetchUsers();
  
      console.log(`User with ID ${userId} deleted successfully`);
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };
  const handleAddMeal = () => {
    // Przygotuj pustą potrawę do dodania
    const newMeal = {
      id: '', // Możesz ustawić ID lub użyć backendu do generowania nowego ID
      name: '',
      description: '',
      category: '',
      price: '',
      image: '',
      protein: '',
      carbo: '',
      fat: '',
      calories: '',
      portion: '',
    };

    // Ustaw nową potrawę jako aktualnie wybraną
    setSelectedMeal(newMeal);

    // Pokaż modal do modyfikacji potrawy (ponieważ to jest ten sam modal)
    setShowModal(true);
  };
  const handleMessages = (userId) => {
    navigate(`/panel/messages/${userId}`);
  };
  const handleModifyClick = (meal) => {
    setSelectedMeal(meal);
    setShowModal(true);
  };
  const handleModalClose = () => {
    setSelectedMeal(null);
    setShowModal(false);
  };
  const handleSaveChanges = async () => {
    try {
      if (selectedMeal.id) {
      const response = await axios.put(`http://localhost:8080/api/mealsList/${selectedMeal.id}`, selectedMeal);

      if (!response.ok) {
        console.error('Failed to save changes:', response.statusText);
        // Handle error accordingly
        return;
      }
    } else {
      // To nowa potrawa, użyj POST do dodania nowej potrawy
      const response = await axios.post('http://localhost:8080/api/mealsList', selectedMeal);
      
      if (!response.ok) {
        console.error('Failed to add a new meal:', response.statusText);
        // Handle error accordingly
        return;
      }
      handleModalClose();
      
      // Pobierz ponownie listę potraw po dodaniu/aktualizacji
      const updatedMealData = await axios.get('http://localhost:8080/api/mealsList');
      setMealData(updatedMealData.data);
    }
    } catch (error) {
      console.error('Error:', error);
    }
    
  };
  const handleDeleteMeal = async (mealId) => {
    try {
      // Wywołaj API do usunięcia potrawy
      await axios.delete(`http://localhost:8080/api/mealsList/${mealId}`);

      // Pobierz ponownie listę potraw po usunięciu
      const updatedMealData = await axios.get('http://localhost:8080/api/mealsList');
      setMealData(updatedMealData.data);

      console.log(`Meal with ID ${mealId} deleted successfully`);
    } catch (error) {
      console.error('Error deleting meal:', error);
    }
  };

  return (
    <div>
      <Navigation />
      <div className={styles.main_container}>
        <div className={styles.content}>
          <h1>Panel Administratora</h1>
          <table>
            <thead>
              <tr>
                <th>Imię</th>
                <th>Nazwisko</th>
                <th>Email</th>
                <th>Akcje</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id}>
                  <td>{user.firstName}</td>
                  <td>{user.lastName}</td>
                  <td>{user.email}</td>
                  <td>
                    <button onClick={() => handleDeleteUser(user.id)}>Usuń</button>
                    <button onClick={() => handleMessages(user.id)}>Wiadomości</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <button onClick={toggleContentVisibility}>
        {isContentVisible ? 'Schowaj liste potraw' : 'Pokaż liste potraw'}
      </button>
      {isContentVisible && (
        <div>
          <h2>Tabela posiłków</h2>
          <button onClick={handleAddMeal}>Dodaj</button>
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Nazwa</th>
              </tr>
            </thead>
            <tbody>
              {mealData.map((meal, index) => (
                <tr key={index}>
                  <td>{meal.id}</td>
                  <td>{meal.name}</td>
                  <td><button onClick={() => handleModifyClick(meal)}>Modyfikuj</button></td>
                  <td><button onClick={() => handleDeleteMeal(meal.id)}>Usuń</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        )}
        </div>
      </div>
      <Modal show={showModal} onHide={handleModalClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modyfikuj posiłek</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Form>
          <Form.Group controlId="formId">
            <Form.Label>ID</Form.Label>
            <Form.Control
              type="text"
              placeholder="ID"
              value={selectedMeal?.id || ''}
              disabled
            />
          </Form.Group>
          <Form.Group controlId="formName">
            <Form.Label>Nazwa</Form.Label>
            <Form.Control
              type="text"
              placeholder="Wprowadź nazwę"
              value={selectedMeal?.name || ''}
              onChange={(e) => setSelectedMeal({ ...selectedMeal, name: e.target.value })}
            />
          </Form.Group>
          <Form.Group controlId="formDescription">
            <Form.Label>Opis</Form.Label>
            <Form.Control
              type="text"
              placeholder="Wprowadź opis"
              value={selectedMeal?.description || ''}
              onChange={(e) => setSelectedMeal({ ...selectedMeal, description: e.target.value })}
            />
          </Form.Group>
          <Form.Group controlId="formCategory">
            <Form.Label>Kategoria</Form.Label>
            <Form.Control
              type="text"
              placeholder="Wprowadź kategorię"
              value={selectedMeal?.category || ''}
              onChange={(e) => setSelectedMeal({ ...selectedMeal, category: e.target.value })}
            />
          </Form.Group>
          <Form.Group controlId="formPrice">
            <Form.Label>Cena</Form.Label>
            <Form.Control
              type="text"
              placeholder="Wprowadź cenę"
              value={selectedMeal?.price || ''}
              onChange={(e) => setSelectedMeal({ ...selectedMeal, price: e.target.value })}
            />
          </Form.Group>
          <Form.Group controlId="formImage">
            <Form.Label>Obraz</Form.Label>
            <Form.Control
              type="text"
              placeholder="Wprowadź ścieżkę do obrazu"
              value={selectedMeal?.image || ''}
              onChange={(e) => setSelectedMeal({ ...selectedMeal, image: e.target.value })}
            />
          </Form.Group>
          <Form.Group controlId="formProtein">
            <Form.Label>Białko</Form.Label>
            <Form.Control
              type="text"
              placeholder="Wprowadź ilość białka"
              value={selectedMeal?.protein || ''}
              onChange={(e) => setSelectedMeal({ ...selectedMeal, protein: e.target.value })}
            />
          </Form.Group>
          <Form.Group controlId="formCarbo">
            <Form.Label>Węglowodany</Form.Label>
            <Form.Control
              type="text"
              placeholder="Wprowadź ilość węglowodanów"
              value={selectedMeal?.carbo || ''}
              onChange={(e) => setSelectedMeal({ ...selectedMeal, carbo: e.target.value })}
            />
          </Form.Group>
          <Form.Group controlId="formFat">
            <Form.Label>Tłuszcze</Form.Label>
            <Form.Control
              type="text"
              placeholder="Wprowadź ilość tłuszczu"
              value={selectedMeal?.fat || ''}
              onChange={(e) => setSelectedMeal({ ...selectedMeal, fat: e.target.value })}
            />
          </Form.Group>
          <Form.Group controlId="formCalories">
            <Form.Label>Kalorie</Form.Label>
            <Form.Control
              type="text"
              placeholder="Wprowadź ilość kalorii"
              value={selectedMeal?.calories || ''}
              onChange={(e) => setSelectedMeal({ ...selectedMeal, calories: e.target.value })}
            />
          </Form.Group>
          <Form.Group controlId="formPortion">
            <Form.Label>Porcja</Form.Label>
            <Form.Control
              type="text"
              placeholder="Wprowadź rozmiar porcji"
              value={selectedMeal?.portion || ''}
              onChange={(e) => setSelectedMeal({ ...selectedMeal, portion: e.target.value })}
            />
          </Form.Group>
        </Form>

        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleModalClose}>
            Zamknij
          </Button>
          <Button variant="primary" onClick={handleSaveChanges}>
            Zapisz zmiany
          </Button>
        </Modal.Footer>
      </Modal>
      <Foot />
    </div>
  );
};

export default Panel;
