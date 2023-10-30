import styles from "./styles.module.css"
import React, { useEffect, useState } from "react";
import Logout from "../Logout";
import { Link } from 'react-router-dom';
const Nav = () => {
    return (
            <nav className={styles.navbar}>
                <h1><Link to="/" className={styles.link_elem}>Ctering</Link></h1>
                <Link to="/menu" className={styles.link_elem}>Menu</Link>
                <Link to="/cart" className={styles.link_elem}>Koszyk</Link>
                <Link to="/calc" className={styles.link_elem}>Kalkulator BMR</Link>
                <Link to="/about" className={styles.link_elem}>O nas</Link>
                <div className={styles.tab}>
                    <Logout/>
                </div>
            </nav>
    )
}
export default Nav