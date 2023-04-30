import { DraftSelect } from "../src/components";
import React, { useContext, useEffect } from "react";
import Head from "next/head";
import styles from "../styles/Home.module.scss";
import { CreateBlog } from "../src/containers";
import { getPosts } from "../src/helpers/PostsDatabase";
import { BlogEntry } from "../src/types";
import { getSession, useSession } from "next-auth/react";
import PostsContext from "../src/context/PostsContext";

export default function CreatePage({ data }: { data: BlogEntry[] }) {
    const { data: session } = useSession();
    const { drafts, setDrafts, setPosts } = useContext(PostsContext);

    useEffect(() => {
        setDrafts(data.filter((blog) => blog.isDraft));
        setPosts(data.filter((blog) => !blog.isDraft));

        // eslint-disable-next-line react-hooks/exhaustive-deps
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
            <main className={styles.main}>
                <div className={styles.body}>
                    {session?.user?.email === "zacmelendez@gmail.com" && (
                        <>
                            {drafts.length > 0 && <DraftSelect />}
                            <CreateBlog />
                        </>
                    )}
                </div>
            </main>
        </>
    );
}

export async function getServerSideProps(context: any) {
    const session = await getSession(context);

    if (session?.user?.email !== "zacmelendez@gmail.com") {
        return {
            redirect: {
                destination: "/",
                permanent: false,
            },
        };
    }

    const data = await getPosts();
    return {
        props: {
            data,
        },
    };
}
