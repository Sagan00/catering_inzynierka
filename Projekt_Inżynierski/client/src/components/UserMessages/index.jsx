import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import styles from "./styles.module.css";
import Navigation from "../Navigation";
import Foot from "../Foot";
import axios from "axios";

const UserMessages = () => {
  const { userId } = useParams();
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    fetchMessages(userId);
  }, [userId]);

  const fetchMessages = async (userId) => {
    try {
      const response = await axios.get(`http://localhost:8080/api/panel/messages/${userId}`);
      setMessages(response.data);
    } catch (error) {
      console.error("Error fetching messages:", error);
    }
  };

  return (
    <div>
      <Navigation />
      <div className={styles.main_container}>
        <div className={styles.content}>
          <h1>Wiadomości użytkownika</h1>
          <table>
            <thead>
              <tr>
                <th>Tytuł</th>
                <th>Opis</th>
              </tr>
            </thead>
            <tbody>
              {messages.map((message) => (
                <tr key={message.id}>
                  <td>{message.topic}</td>
                  <td>{message.description}</td>
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
