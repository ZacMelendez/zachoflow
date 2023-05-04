import { NextSeo } from "next-seo";
import { useEffect } from "react";
import { BlogPost } from "../../src/containers";
import { getPost, getPosts } from "../../src/helpers/PostsDatabase";
import { BlogEntry } from "../../src/types";
import styles from "../../styles/Home.module.scss";
import { Box } from "@mantine/core";
import { MobileHeader } from "../../src/components";

export default function Home({ blog }: { blog: BlogEntry }) {
    return (
        <>
            <MobileHeader />
            <NextSeo
                title={`${blog.title}`}
                description={`${blog.description}`}
                defaultTitle="zachOverflow - Dev Blog"
                openGraph={{
                    url: `https://zmelen.dev/posts/${blog.url}`,
                    title: `${blog.title}`,
                    description: `${blog.description}`,
                    images: [
                        {
                            url: `https://zachoverflow.s3.amazonaws.com/images/${blog.id}/splash.png`,
                        },
                    ],
                    site_name: "zachOverflow",
                }}
            />
            <Box className={styles.container}>
                <BlogPost blog={blog} />
            </Box>
        </>
    );
}

export async function getServerSideProps(context: any) {
    context.res.setHeader(
        "Cache-Control",
        "public, s-maxxwage=1800, stale-while-revalidate=86400"
    );
    const { params } = context;
    const post = await getPost(params.url);

    return {
        props: {
            blog: post,
            // comments: comments,
        },
    };
}
