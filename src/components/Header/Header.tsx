import Link from "next/link";
import styles from "./Header.module.scss";
// import classnames from "classnames";
import { ActionIcon, Box, Text, Header } from "@mantine/core";
import ZachOverflow from "../../icons/ZachOverflow";
import React, { useContext, useEffect, useState } from "react";
import Hamburger from "./Hamburger";
import { signIn, signOut, useSession } from "next-auth/react";

export default function NavHeader() {
    const { data: session } = useSession();
    const [menuOpen, setMenuOpen] = useState(false);
    const [screenSize, setScreenSize] = useState<number>(1200);

    useEffect(() => {
        if (typeof window !== "undefined") {
            setScreenSize(window.innerWidth);
        }
    }, []);

    const updateMedia = () => {
        setScreenSize(window.innerWidth);
    };

    useEffect(() => {
        window.addEventListener("resize", updateMedia);
        return () => window.removeEventListener("resize", updateMedia);
    }, []);

    const handleClick = () => {
        if (session?.user) return signOut();
        signIn("google");
    };

    return (
        <>
            {screenSize > 576 ? (
                <Box className={styles.div}>
                    <Box className={styles.title} onClick={() => handleClick()}>
                        <ZachOverflow primary="#c1c2c5" />
                        <Text>zach</Text>
                        <Text style={{ fontWeight: 500 }}>overflow</Text>
                    </Box>
                    <ul className={styles.nav}>
                        <li>
                            <Link className={styles.navLink} href="/">
                                About
                            </Link>
                        </li>
                        <li>
                            <Link className={styles.navLink} href="/posts">
                                Posts
                            </Link>
                        </li>
                        {session?.user?.email === "zacmelendez@gmail.com" && (
                            <li>
                                <Link className={styles.navLink} href="/create">
                                    Create
                                </Link>
                            </li>
                        )}
                    </ul>
                </Box>
            ) : (
                <>
                    <Box className={styles.mobile}>
                        <Box
                            className={styles.title}
                            onClick={() =>
                                session?.user ? signIn("google") : signOut()
                            }
                        >
                            <ZachOverflow primary="#e5e5e3" />
                            <Text>zach</Text>
                            <Text style={{ fontWeight: 600 }}>overflow</Text>
                        </Box>
                        <Hamburger />
                    </Box>
                </>
            )}
        </>
    );
}
