import moment from "moment";
import Head from "next/head";
import { useContext, useEffect } from "react";
import PostsContext from "../../src/context/PostsContext";
import { BlogEntry } from "../../src/types";
import styles from "../../styles/Home.module.scss";
import { PostItem } from "../../src/components";

function timeout(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

export default function PostsPage() {
    const { posts, setPosts } = useContext(PostsContext);

    const getAllPosts = async () => {
        const response = await fetch("/api/posts");
        const data = ((await response.json()) as BlogEntry[]).filter(
            (blog) => !blog.isDraft
        );
        setPosts(
            data.sort(
                (a, b) => moment(b.date).valueOf() - moment(a.date).valueOf()
            )
        );
    };

    useEffect(() => {
        getAllPosts();
    }, []);

    return (
        <>
            <Head>
                <title>zachOverflow - Dev Blog</title>
                <meta
                    name="description"
                    content="Zachary Melendez' Blog Site"
                />
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1"
                />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <div className={styles.body}>
                <ul className={styles.postlist}>
                    {posts.length >= 1 &&
                        posts.map((item: BlogEntry) => (
                            <PostItem key={item.id} item={item} />
                        ))}
                </ul>
            </div>
        </>
    );
}
