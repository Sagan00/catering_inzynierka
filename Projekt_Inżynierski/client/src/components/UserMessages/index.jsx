// components/UserMessages.js

import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import styles from "./styles.module.css";
import Navigation from "../Navigation";
import Foot from "../Foot";
import axios from "axios";

const UserMessages = () => {
  const { userId } = useParams();
  const [messages, setMessages] = useState([]);
  const [userEmail, setUserEmail] = useState('');

  useEffect(() => {
    fetchUserData(userId);
    fetchMessages(userId);
  }, [userId]);

  const fetchUserData = async (userId) => {
    try {
      const response = await axios.get(`http://localhost:8080/api/panel/users`);
      const user = response.data.find((user) => user.id === parseInt(userId)); // parseInt(userId) added
      setUserEmail(user.email);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  const fetchMessages = async (userId) => {
    try {
      const response = await axios.get(`http://localhost:8080/api/panel/messages/${userId}`);
      setMessages(response.data);
    } catch (error) {
      console.error("Error fetching messages:", error);
    }
  };

  const handleDeleteMessage = async (messageId) => {
    try {
      await axios.delete(`http://localhost:8080/api/panel/message/${messageId}`);
      // Usuń wiadomość z lokalnego stanu
      setMessages((prevMessages) => prevMessages.filter((message) => message.id !== messageId));
    } catch (error) {
      console.error("Error deleting message:", error);
    }
  };

  return (
    <div>
      <Navigation />
      <div className={styles.main_container}>
        <div className={styles.content}>
          <h1>Wiadomości użytkownika - {userEmail}</h1>
          <table>
            <thead>
              <tr>
                <th>Tytuł</th>
                <th>Opis</th>
                <th>Akcje</th>
              </tr>
            </thead>
            <tbody>
              {messages.map((message) => (
                <tr key={message.id}>
                  <td>{message.topic}</td>
                  <td>{message.description}</td>
                  <td>
                    <button onClick={() => handleDeleteMessage(message.id)}>Usuń</button>
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

export default UserMessages;
