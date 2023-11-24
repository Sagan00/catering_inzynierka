import styles from "./styles.module.css"
import React, { } from "react";
import Navigation from "../Navigation";
import Foot from "../Foot";
const Main = () => {
    const email = localStorage.getItem("email");
    return (
        <div>
            <Navigation/>
            <div className={styles.main_container}>
                <h1>Ctering</h1>
                {email}
            </div>
            <Foot/>
        </div>
    )
}
export default Main