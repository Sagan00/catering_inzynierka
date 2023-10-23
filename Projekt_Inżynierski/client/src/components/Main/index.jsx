import styles from "./styles.module.css"
import React, { useEffect, useState } from "react";
import Logout from "./Logout";
const Links = () => {
    return (
        <div className={styles.main_container}>
            <nav className={styles.navbar}>
                <h1>Ctering</h1>
                <div className={styles.tab}>
                    <div className={styles.menu}>
                    </div>
                </div>
                <div className={styles.tab}>
                    <Logout/>
                </div>
            </nav>
            <div className={styles.pad}>
            </div>
        </div>
    )
}
export default Links