import styles from "./styles.module.css"
import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
const Foot = () => {
    return (
            <div className={styles.content}>
                <div className={styles.link_grp}>
                    <div className={styles.link_copy}>2023 &copy; CTERING</div>
                    <div className={styles.link_copy}>kontakt@ctering.pl</div>
                </div>
                <div className={styles.link_grp}>
                    <Link to="/" className={styles.link_elem}>Ctering</Link>
                    <Link to="/menu" className={styles.link_elem}>Menu</Link>
                    <Link to="/cart" className={styles.link_elem}>Koszyk</Link>
                    <Link to="/calc" className={styles.link_elem}>Kalkulator BMR</Link>
                    <Link to="/about" className={styles.link_elem}>O nas</Link>
                </div>
                <div className={styles.link_grp}>
                    <Link to="/" className={styles.link_elem}>Ctering</Link>
                    <Link to="/about" className={styles.link_elem}>Menu</Link>
                    <Link to="/about" className={styles.link_elem}>Koszyk</Link>
                    <Link to="/about" className={styles.link_elem}>Kalkulator BMR</Link>
                    <Link to="/about" className={styles.link_elem}>O nas</Link>
                </div>
            </div>
    )
}
export default Foot