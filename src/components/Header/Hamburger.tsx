import React, { useContext } from "react";

import styles from "./Hamburger.module.scss";
import MobileContext from "../../context/MobileContext";
import { Menu, Text } from "@mantine/core";
import Link from "next/link";

export default function Hamburger() {
    const { menuOpened, setMenuOpened } = useContext(MobileContext);

    return (
        <Menu
            shadow="sm"
            width={200}
            position="bottom-end"
            onClose={() => setMenuOpened(false)}
        >
            <Menu.Target>
                <div
                    id="hamburger"
                    onClick={() => {
                        setMenuOpened(!menuOpened);
                    }}
                    className={styles.hamburger}
                >
                    <div
                        className={`${styles.burger} ${styles.burger1} ${
                            menuOpened ? `${styles.b1open}` : ""
                        }`}
                    />
                    <div
                        className={`${styles.burger} ${styles.burger2} ${
                            menuOpened ? `${styles.b2open}` : ""
                        }`}
                    />
                    <div
                        className={`${styles.burger} ${styles.burger3} ${
                            menuOpened ? `${styles.b3open}` : ""
                        }`}
                    />
                </div>
            </Menu.Target>

            <Menu.Dropdown>
                <Link style={{ textDecoration: "none" }} href="/">
                    <Menu.Item>
                        <Text size={"lg"}>About</Text>
                    </Menu.Item>
                </Link>
                <Link style={{ textDecoration: "none" }} href="posts">
                    <Menu.Item>
                        <Text size={"lg"}>Posts</Text>
                    </Menu.Item>
                </Link>
            </Menu.Dropdown>
        </Menu>
    );
}
