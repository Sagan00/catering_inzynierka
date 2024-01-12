// Panel.js
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./styles.module.css";
import Navigation from "../Navigation";
import Foot from "../Foot";
import axios from "axios";

const Panel = () => {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchUsers();
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

  const handleMessages = (userId) => {
    navigate(`/panel/messages/${userId}`);
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
        </div>
      </div>
      <Foot />
    </div>
  );
};

export default Panel;
