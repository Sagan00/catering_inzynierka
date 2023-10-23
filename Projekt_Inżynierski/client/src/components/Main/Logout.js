import React from "react";
import styles from "./styles.module.css"

const Logout = () => {
    const handleLogout = () => {
        localStorage.removeItem("token")
        window.location.reload()
    }
    return (
        <div>
        <button className={styles.white_btn} onClick={handleLogout}>Wyloguj</button>
        </div>
    );
};

export default Logout;