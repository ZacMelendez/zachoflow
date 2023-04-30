import { NextSeo } from "next-seo";
import React from "react";
// import { Header } from "../src/components";
// import { About } from "../src/containers/";
import styles from "../styles/Home.module.scss";
import { Box, Title, Text } from "@mantine/core";
import Image from "next/image";

export default function Home() {
    return (
        <>
            <NextSeo
                title="zachOverflow - Dev Blog"
                description="Welcome to my Dev Blog, where I am looking to document my learnings along the way to becoming a Cloud/IoT Engineer!"
                defaultTitle="About"
                openGraph={{
                    url: "https://zmelen.dev/",
                    title: "zachOverflow - Dev Blog",
                    description:
                        "Welcome to my Dev Blog, where I am looking to document my learnings along the way to becoming a Cloud/IoT Engineer!",
                    images: [
                        {
                            url: "https://zachoverflow.s3.amazonaws.com/images/splash.png",
                        },
                    ],
                    site_name: "zachOverflow",
                }}
            />
            <Box className={styles.container}>
                <Image
                    loader={({ src, width }) => {
                        return `${src}?w=${width}`;
                    }}
                    src={
                        "https://s3.amazonaws.com/zachoverflow/images/about.png"
                    }
                    alt={"About photo"}
                    width={250}
                    height={250}
                    className={styles.image}
                />
                <Box className={styles.paragraphs}>
                    <Text>
                        Hi, my name is Zach Melendez. I am a Mechanical
                        Engineering Graduate from the University of Connecticut
                        with experience in Front & Back-End Web Development.
                    </Text>
                    <Text>
                        I currently work as an IoT Development Engineer, where I
                        work in conjunction with our developer team to manage a
                        Microsoft Azure Cloud Data Lake & IoT Hub which
                        communicate with a JavaScript based customer
                        application.
                    </Text>
                    <Text>
                        I am experienced in languages such as Python,
                        JavaScript, HTML & CSS, and have utilized NodeJS, React,
                        SASS, and Next.JS for web development projects. I also
                        have experience with Docker, Azure, and the Linux CLI
                        from my work with IoT Applications.
                    </Text>
                    <Text>
                        I have developed this blog using NextJS, Typescript and
                        AWS for the PostsDatabases. I would like to document my
                        learnings on my path to becoming a Cloud Developer, and
                        know that my learnings will be able to help others along
                        the way.
                    </Text>
                </Box>
            </Box>
        </>
    );
}
