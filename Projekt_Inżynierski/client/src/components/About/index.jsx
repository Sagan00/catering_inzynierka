import styles from "./styles.module.css"
import React from "react";
import Nav from "../Navigation";
import Foot from "../Foot";
const About = () => {
    return (
        <div>
            <Nav/>
            <div className={styles.main_container}>
                <h1>O nas</h1>
            </div>
            <Foot/>
        </div>
    )
}
export default About