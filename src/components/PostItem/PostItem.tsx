import { Box, Card, Text } from "@mantine/core";
import moment from "moment";
import Link from "next/link";
import React, { ReactNode, useContext } from "react";
import PostsContext from "../../context/PostsContext";
import { BlogEntry, PostCategory } from "../../types";
import styles from "./PostItem.module.scss";
import { WebDev, IoTDev, CloudDev } from "../../icons";
import * as uuid from "uuid";

const getIcon = (category: PostCategory): ReactNode => {
    switch (category) {
        case "IOT_DEV":
            return <IoTDev />;
        case "WEB_DEV":
            return <WebDev />;
        case "CLOUD_DEV":
            return <CloudDev />;
    }
};

export default function PostItem({ item }: { item: BlogEntry }) {
    return (
        <li key={item.id} className={styles.link}>
            <Link href={`/posts/${item.url}`}>
                <Card className={styles.card}>
                    {getIcon(item.type)}
                    <Text className={styles.title}>{item.title}</Text>
                    <Text className={styles.date}>
                        {moment(item.date).format("MMMM DD, YYYY")}
                    </Text>
                    <Text className={styles.description}>
                        {item.description}
                    </Text>
                </Card>
            </Link>
        </li>
    );
}

export function PostList() {
    const { posts } = useContext(PostsContext);

    return (
        <Box className={styles.container}>
            <ul className={styles.postlist}>
                {posts.length >= 1 &&
                    posts.map((item: BlogEntry) => (
                        <PostItem key={uuid.v4()} item={item} />
                    ))}
            </ul>
        </Box>
    );
}
