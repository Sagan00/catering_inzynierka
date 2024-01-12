import React from "react";
import styles from "./styles.module.css";

const Logout = () => {
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("email");
    localStorage.removeItem("role");
    window.location.reload();
  };
  return (
    <button // Białe tło przycisku
      className={styles.white_btn} // Różowy napis
      onClick={handleLogout}
    >
      Wyloguj
    </button>
  );
};

export default Logout;
