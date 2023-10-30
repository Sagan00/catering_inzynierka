import styles from "./styles.module.css"
import React, { useEffect, useState } from "react";
import Nav from "../Navigation";
import Foot from "../Foot";
const Menu = () => {
    return (
        <div>
            <Nav/>
            <div className={styles.main_container}>
                <h1>Menu</h1>
            </div>
            <Foot/>
        </div>
    )
}
export default Menu