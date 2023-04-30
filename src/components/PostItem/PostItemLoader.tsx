import Link from "next/link";
import { BlogEntry } from "../../types";
import styles from "./PostItem.module.scss";
import { Paper, Text } from "@mantine/core";
import moment from "moment";

export default function PostItemLoader({ item }: { item: BlogEntry }) {
    return (
        <li key={item.id} className={styles.link}>
            <Link href={`/posts/${item.url}`}>
                <Paper className={styles.card}>
                    {/* {getIcon(item.type)} */}
                    <Text className={styles.title}>{item.title}</Text>
                    <Text className={styles.date}>
                        {moment(item.date).format("MMMM DD, YYYY")}
                    </Text>
                    <Text className={styles.description}>
                        {item.description}
                    </Text>
                </Paper>
            </Link>
        </li>
    );
}
