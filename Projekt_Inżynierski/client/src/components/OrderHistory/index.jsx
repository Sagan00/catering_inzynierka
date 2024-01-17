// components/OrderHistory/index.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "./styles.module.css";
import Navigation from "../Navigation";
import Foot from "../Foot";

const OrderHistory = () => {
  const [orderHistory, setOrderHistory] = useState([]);
  const [orderCancelled, setOrderCancelled] = useState(false);

  useEffect(() => {
    const userEmail = localStorage.getItem("email");

    if (userEmail) {
      axios
        .get(`http://localhost:8080/api/account/ordersHistory`, {
          headers: { Authorization: userEmail },
        })
        .then((response) => {
          setOrderHistory(response.data);
        })
        .catch((error) => {
          console.error("Error fetching order history:", error);
        });
    }
  }, [orderCancelled]);

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const handleCancelOrder = (orderId) => {
    axios
      .put(
        `http://localhost:8080/api/account/ordersHistory/${orderId}/cancel`,
        {},
        {
          headers: { Authorization: localStorage.getItem("email") },
        }
      )
      .then((response) => {
        console.log(response.data.message);
        setOrderCancelled(!orderCancelled);
      })
      .catch((error) => {
        console.error("Error cancelling order:", error);
      });
  };

  return (
    <div>
      <Navigation />
      <div className={styles.main_container}>
        <h1>Historia zamówień</h1>
        <div className={styles.content}>
          <table className={styles.orderTable}>
            <thead>
              <tr>
                <th>Dieta</th>
                <th>Rozpoczęcie</th>
                <th>Zakończenie</th>
                <th>Status</th>
                <th>Akcje</th>
              </tr>
            </thead>
            <tbody>
              {orderHistory.map((order, index) => (
                <tr key={index}>
                  <td>{order.dietName}</td>
                  <td>{formatDate(order.startDate)}</td>
                  <td>{formatDate(order.endDate)}</td>
                  <td>{order.isActive}</td>
                  <td>
                    {order.isActive === "ACTIVE" && (
                      <button onClick={() => handleCancelOrder(order.id)}>
                        Anuluj
                      </button>
                    )}
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

export default OrderHistory;
