import { Box, Text } from "@mantine/core";
import { useContext } from "react";
import PostsContext from "../../context/PostsContext";
import Link from "next/link";
import styles from "./TOC.module.scss";

export default function TableOfContents() {
    const { tableOfContents } = useContext(PostsContext);

    return (
        <Box className={styles.contentsTable}>
            {tableOfContents?.map((id: string) => {
                const text = id
                    .replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, "")
                    .trim()
                    .replace(/\s+/g, "-")
                    .toLowerCase();
                return (
                    <Link href={`#${text}`} key={text}>
                        <Text>{id.replace("##", "").replace("\n", "")}</Text>
                    </Link>
                );
            })}
        </Box>
    );
}
