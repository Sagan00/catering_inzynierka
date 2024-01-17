// PanelUserOrderHistory.js
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import styles from "./styles.module.css";
import Navigation from "../Navigation";
import Foot from "../Foot";

const PanelUserOrderHistory = () => {
  const { userId } = useParams();
  const [orderHistory, setOrderHistory] = useState([]);
  const [error, setError] = useState(null);

  const fetchOrderHistory = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/api/panel/userOrderHistory/${userId}`
      );
      setOrderHistory(response.data);
    } catch (error) {
      setError(error.message);
    }
  };

  useEffect(() => {
    fetchOrderHistory();
  }, [userId]);

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const handleCancelOrder = async (orderId) => {
    try {
      await axios.put(`http://localhost:8080/api/panel/cancelOrder/${orderId}`);
      // Reload order history after canceling an order
      fetchOrderHistory();
    } catch (error) {
      setError(error.message);
    }
  };

  const handleDeleteOrder = async (orderId) => {
    try {
      await axios.delete(
        `http://localhost:8080/api/panel/deleteOrder/${orderId}`
      );
      // Reload order history after deleting an order
      fetchOrderHistory();
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div>
      <Navigation />
      <div className={styles.main_container}>
        <h1>Historia zamówień użytkownika</h1>
        <div className={styles.content}>
          {orderHistory.length > 0 ? (
            <table>
              <thead>
                <tr>
                  <th>Nazwa potrawy</th>
                  <th>Całkowity koszt</th>
                  <th>Data rozpoczęcia</th>
                  <th>Data zakończenia</th>
                  <th>Aktywne</th>
                  <th>Akcje</th>
                </tr>
              </thead>
              <tbody>
                {orderHistory.map((order) => (
                  <tr key={order.id}>
                    <td>{order.menu.dietName}</td>
                    <td>{order.total_cost}</td>
                    <td>{formatDate(order.start_date)}</td>
                    <td>{formatDate(order.end_date)}</td>
                    <td>{order.is_active}</td>
                    <td>
                      {order.is_active === "ACTIVE" && (
                        <>
                          <button onClick={() => handleCancelOrder(order.id)}>
                            Anuluj
                          </button>
                        </>
                      )}
                      <button onClick={() => handleDeleteOrder(order.id)}>
                        Usuń
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>Brak historii zamówień dla tego użytkownika.</p>
          )}
        </div>
      </div>
      <Foot />
    </div>
  );
};

export default PanelUserOrderHistory;
