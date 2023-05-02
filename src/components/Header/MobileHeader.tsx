import { useContext } from "react";
import MobileContext from "../../context/MobileContext";
import { Box, Button, Drawer } from "@mantine/core";
import styles from "./Header.module.scss";
import Link from "next/link";
import Hamburger from "./Hamburger";

export default function MobileHeader() {
    const { menuOpened, setMenuOpened } = useContext(MobileContext);
    return (
        // <Drawer
        //     opened={menuOpened}
        //     onClose={() => setMenuOpened(false)}
        //     position="top"
        //     style={{ zIndex: 999 }}
        //     size={185}
        //     withCloseButton={false}
        //     padding={15}
        // >
        //     <Box
        //         style={{
        //             position: "absolute",
        //             right: "35px",
        //         }}
        //     >
        //         <Hamburger />
        //     </Box>
        //     <ul className={styles.nav}>
        //         <li>
        //             <Link
        //                 className={styles.navLink}
        //                 href="/"
        //                 onClick={() => setMenuOpened(false)}
        //             >
        //                 About
        //             </Link>
        //         </li>
        //         <li>
        //             <Link
        //                 className={styles.navLink}
        //                 href="/posts"
        //                 onClick={() => setMenuOpened(false)}
        //             >
        //                 Posts
        //             </Link>
        //         </li>
        //     </ul>
        // </Drawer>
        <></>
    );
}
