import React, { useContext } from "react";

import styles from "./Hamburger.module.scss";

export default function Hamburger() {
    return (
        <div
            id="hamburger"
            // onClick={() => setMenuOpen(!menuOpen)}
            className={styles.hamburger}
        >
            {/* <div
                className={`${styles.burger} ${styles.burger1} ${
                    menuOpen ? `${styles.b1open}` : ""
                }`}
            />
            <div
                className={`${styles.burger} ${styles.burger2} ${
                    menuOpen ? `${styles.b2open}` : ""
                }`}
            />
            <div
                className={`${styles.burger} ${styles.burger3} ${
                    menuOpen ? `${styles.b3open}` : ""
                }`}
            /> */}
        </div>
    );
}
