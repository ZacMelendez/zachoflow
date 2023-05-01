import {
    ActionIcon,
    Box,
    CopyButton,
    Paper,
    Text,
    Title,
    Tooltip,
} from "@mantine/core";
import { IconArrowLeft, IconCheck, IconCopy } from "@tabler/icons-react";
import moment from "moment";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useContext, useEffect, useRef } from "react";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { duotoneLight as light } from "react-syntax-highlighter/dist/cjs/styles/prism";
import unwrapImages from "remark-unwrap-images";
// import { PostMenu } from "../../components";
import { BlogEntry } from "../../types";
import styles from "./BlogPost.module.scss";
import PostsContext from "../../context/PostsContext";
import { useIntersection } from "@mantine/hooks";

export default function BlogPost({ blog }: { blog: BlogEntry }) {
    const { setTableOfContents } = useContext(PostsContext);

    const containerRef = useRef(null);

    useEffect(() => {
        setTableOfContents(blog.content.match(/^##.*\n$/gm));
    }, []);

    return (
        <Box className={styles.container}>
            <Box className={styles.postHead}>
                <Link href="/posts" className={styles.back}>
                    <IconArrowLeft size={24} />
                    <Text>back to all posts</Text>
                </Link>
                {/* {session?.user?.email === "zacmelendez@gmail.com" && (
                    <PostMenu blog={blog} />
                )} */}
            </Box>
            <Box className={styles.head}>
                <Title order={1} className={styles.title}>
                    {blog.title}
                </Title>
                <Text className={styles.date}>
                    {moment(blog.date).format("MMMM DD, YYYY")}
                </Text>
            </Box>
            <Box ref={containerRef} className={styles.blogPost}>
                <article style={{ width: "100%" }}>
                    <ReactMarkdown
                        className={styles.markdown}
                        remarkPlugins={[unwrapImages]}
                        components={{
                            code({
                                node,
                                inline,
                                className,
                                children,
                                ...props
                            }) {
                                const match = /language-(\w+)/.exec(
                                    className || ""
                                );
                                return !inline && match ? (
                                    <Box className={styles.codeDiv}>
                                        <CopyButton
                                            value={String(children).replace(
                                                /\n$/,
                                                ""
                                            )}
                                        >
                                            {({ copied, copy }) => (
                                                <Tooltip
                                                    label={
                                                        copied
                                                            ? "Copied"
                                                            : "Copy"
                                                    }
                                                    withArrow
                                                    position="right"
                                                >
                                                    <ActionIcon
                                                        color={
                                                            copied
                                                                ? "teal"
                                                                : "gray"
                                                        }
                                                        onClick={copy}
                                                        className={
                                                            styles.button
                                                        }
                                                    >
                                                        {copied ? (
                                                            <IconCheck
                                                                size={16}
                                                            />
                                                        ) : (
                                                            <IconCopy
                                                                size={16}
                                                            />
                                                        )}
                                                    </ActionIcon>
                                                </Tooltip>
                                            )}
                                        </CopyButton>
                                        <SyntaxHighlighter
                                            // @ts-ignore
                                            style={light}
                                            language={match[1]}
                                            PreTag="div"
                                            className={styles.codeBlock}
                                            {...props}
                                        >
                                            {String(children).replace(
                                                /\n$/,
                                                ""
                                            )}
                                        </SyntaxHighlighter>
                                    </Box>
                                ) : (
                                    <code
                                        className={styles.codeLine}
                                        {...props}
                                    >
                                        {children}
                                    </code>
                                );
                            },
                            h2({ node, className, children, ...props }) {
                                return (
                                    <Title
                                        order={2}
                                        id={String(children)
                                            .replace(
                                                /[.,\/#!$%\^&\*;:{}=\-_`~()]/g,
                                                ""
                                            )
                                            .trim()
                                            .replace(/\s+/g, "-")
                                            .toLowerCase()}
                                        style={{
                                            scrollMarginTop: "59px",
                                            paddingTop: "15px",
                                        }}
                                        className={styles.blogH2}
                                    >
                                        {children}
                                    </Title>
                                );
                            },
                            p({ node, className, children, ...props }) {
                                return (
                                    <Text className={styles.blogP}>
                                        {children}
                                    </Text>
                                );
                            },
                            img({ node, className, children, ...props }) {
                                return (
                                    <Box
                                        style={{
                                            width: "100%",
                                            height: "100%",
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "center",
                                        }}
                                    >
                                        <img
                                            src={
                                                (node?.properties
                                                    ?.src as string) || ""
                                            }
                                            alt={
                                                (node?.properties
                                                    ?.alt as string) || ""
                                            }
                                            style={{
                                                maxHeight: "500px",
                                                maxWidth: "70%",
                                            }}
                                            className={styles.image}
                                            {...props}
                                        />
                                    </Box>
                                );
                            },
                        }}
                    >
                        {blog.content}
                    </ReactMarkdown>
                </article>
            </Box>
        </Box>
    );
}
