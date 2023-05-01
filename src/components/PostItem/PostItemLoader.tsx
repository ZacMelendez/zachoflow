import { BlogEntry } from "../../types";
import styles from "./PostItem.module.scss";
import { Box, Paper, Text } from "@mantine/core";

export default function PostItemLoader() {
    return (
        <Paper className={styles.loader}>
            <Box className={styles.icon} />
            <Box className={styles.title}>
                <Box />
                <Box />
            </Box>
            <Box className={styles.date} />
            <Box className={styles.description}>
                <Box />
                <Box />
                <Box />
                <Box />
            </Box>
        </Paper>
    );
}
