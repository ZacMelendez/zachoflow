import moment from "moment";
import Head from "next/head";
import { useContext, useEffect, useState } from "react";
import PostsContext from "../../src/context/PostsContext";
import { BlogEntry } from "../../src/types";
import styles from "../../styles/Home.module.scss";
import { PostItem, PostItemLoader } from "../../src/components";

export default function PostsPage() {
    const { posts, setPosts } = useContext(PostsContext);
    const [loading, setLoading] = useState<boolean>(true);

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
        setLoading(false);
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
                    {loading &&
                        [1, 2, 3, 4, 5].map((_) => <PostItemLoader key={_} />)}
                </ul>
            </div>
        </>
    );
}
