import React, { useState, useEffect } from 'react';
import { Spinner } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";

const Payment = () => {
  const [redirect, setRedirect] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      setRedirect(true);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (redirect) {
      navigate("/");
    }
  }, [redirect]);

  return (
    <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
      <Spinner animation="border" role="status" style={{  width: "10rem", height: "10rem" }}>
      </Spinner>
      <h1>Przetwarzanie płatności...</h1>
    </div>
  );
};

export default Payment;